import { User } from '@prisma/client';

import { Publication } from './Output';


export type UserSafe = Omit<User, 'password' | 'passwordHash'>;


export interface UserAccess {
  type: 'user';
  user: UserSafe;
  scope?: Publication;
  publications: Publication[];
  isAdmin: boolean;
}


export interface PublicAccess {
  type: 'public';
  scope?: Publication;
  publications: Publication[];
}


export type Access = UserAccess | PublicAccess;


export function isUser(access: Access): access is UserAccess {
  return access.type === 'user';
}

export function isAdmin(access: Access) {
  return isUser(access) && access.isAdmin;
}

export function makePublicAccess(): PublicAccess {
  return { type: 'public', publications: [] };
}

export function findUniqueScope(access: UserAccess): Publication | null {
  return access.scope || (access.publications.length === 1 ? access.publications[0] : null);
}
