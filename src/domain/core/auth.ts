import { ClientAppToken, UserToken } from '@prisma/client';
import argon2 from 'argon2';
import cryptoRandomString from 'crypto-random-string';

import { findClientApp } from '../../data/client';
import { generateClientToken, generateUserToken } from '../../data/code';
import { findUserToken } from '../../data/token';
import { changePassword, findUserByEmail } from '../../data/user';

import { Access, ClientAppAccess, UserAccess, UserInfo } from '../Access';
import { ErrorCode } from '../AppError';
import { Context } from '../Context';
import { GrantType, Credentials } from '../Input';
import { AuthToken } from '../Output';
import { R } from '../R';


export async function authenticate(ctx: Context, grantType: GrantType, input: Credentials): DomainResult<AuthToken> {

  const { db } = ctx;
  const { id, secret } = input;

  if (grantType === 'USER') {

    const user = await findUserByEmail(db, id);

    // User with given email not found.
    if (!user) {
      return R.ofError(ErrorCode.INVALID_CRD, 'Invalid user credentials');
    }

    const verified = await verifyPassword(user.password, secret, user.hashFn);

    // User with given email found but not password match.
    if (!verified) {
      return R.ofError(ErrorCode.INVALID_CRD, 'Invalid user credentials');
    }

    const token = await generateUserToken(db, user.id);

    return R.of({ ...token, type: 'Bearer' });

  } else if (grantType === 'CLIENT') {

    const app = await findClientApp(db, id);

    // App with given id not found.
    if (!app) {
      return R.ofError(ErrorCode.INVALID_CRD, 'Invalid client credentials');
    }

    const verified = await verifyPassword(app.secret, secret, app.hashFn);

    // Use with given email found but not password match.
    if (!verified) {
      return R.ofError(ErrorCode.INVALID_CRD, 'Invalid client credentials');
    }

    const token = await generateClientToken(db, app.id);

    return R.of({ ...token, type: 'Bearer' });
  }

  return R.ofError(ErrorCode.INVALID_AUTH_REQUEST, '');
}


export async function forgotPassword(ctx: Context, username: string): DomainResult<boolean> {

  const { db } = ctx;

  const user = await db.user.findUnique({
    where: {
      email: username
    },
    include: {
      resetRequest: true
    }
  });

  if (!user) {
    return R.of(true);
  }

  if (!user.resetRequest) {
    user.resetRequest = await db.resetPasswordRequest.create({
      data: {
        code: cryptoRandomString({ length: 96, type: 'url-safe' }),
        userId: user.id
      }
    });
  }

  // TODO: Send the email again

  return R.of(true);
}


export async function resetPassword(ctx: Context, code: string, newPassword: string): DomainResult<boolean> {

  // Token is valid for 30 minutes only
  const { db } = ctx;
  const validTime = new Date(Date.now() - 30 * 60000);

  const resetReqeust = await ctx.db.resetPasswordRequest.findFirst({
    where: {
      AND: {
        code,
        updatedAt: {
          gte: validTime
        }
      }
    }
  });

  if (!resetReqeust) {
    return R.ofError(ErrorCode.INVALID_AUTH_REQUEST, '');
  }

  const changePasswordT = (await changePassword(db, resetReqeust.userId, newPassword))();

  const deleteRequestT = ctx.db.resetPasswordRequest.delete({
    where: {
      id: resetReqeust.id
    }
  });

  await ctx.db.$transaction([changePasswordT, deleteRequestT]);

  return R.of(true);
}


// TODO: Rename the method name to getAccessForToken or similar.
export async function getAccessForToken(db: Context['db'], tokenId: string, scope?: bigint): DomainResult<Access> {
  if (tokenId.startsWith('u')) {
    return getUserAccess(db, tokenId, scope);
  } else if (tokenId.startsWith('c')) {
    return getClientAppAccess(db, tokenId, scope);
  }

  return invalidToken();
}


async function getUserAccess(db: Context['db'], tokenId: string, scope?: bigint): DomainResult<UserAccess> {

  // TODO: Do not select password related sensitive data
  const token = await findUserToken(db, tokenId);

  if (!isTokenValid(token)) {
    return invalidToken();
  }

  const { user } = token;

  const maybeRole = scope && user.roles.find((r) => r.publicationId === scope);

  if (!maybeRole) {
    return R.ofError(ErrorCode.FORBIDDEN, 'Trying to access unknown publication');
  }

  const userInfo: UserInfo = {
    ...user,
    role: maybeRole.roleId
  };

  const access: UserAccess = {
    type: 'user',
    user: userInfo,
    scope: maybeRole.publication
  };

  return R.of(access);
}

async function getClientAppAccess(
  db: Context['db'], tokenId: string, scope?: bigint): DomainResult<ClientAppAccess> {

  const token = await db.clientAppToken.findUnique({
    where: { id: tokenId },
    include: {
      clientApp: true
    }
  });

  if (!isTokenValid(token)) {
    return invalidToken();
  }

  const access: ClientAppAccess = {
    type: 'client',
    scopeId: scope
  };

  if (scope) {
    const publication = await db.publication.findUnique({
      where: { id: scope }
    });

    if (!publication) {
      return R.ofError(ErrorCode.FORBIDDEN, 'Trying to access unknown publication');
    }

    access.scope = publication;
  }

  return R.of(access);
}


function verifyPassword(hash: string, password: string, algo: string): Promise<boolean> {
  if (algo === 'argon2id') {
    return argon2.verify(hash, password, { type: argon2.argon2id })
  }

  throw 'Only argon2id hashing is supported';
}


function isTokenValid<T extends UserToken | ClientAppToken>(token: null | T): token is T {
  return !!token && (token.generatedAt.getTime() + token.duration) >= Date.now();
}

function invalidToken() {
  return R.ofError(ErrorCode.INVALID_TOKEN, 'Invalid authentication token');
}
