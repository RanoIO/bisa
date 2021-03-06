import { PrismaClient } from '@prisma/client';
import { ApolloServer, AuthenticationError } from 'apollo-server';
import type { ApolloServerPlugin } from 'apollo-server-plugin-base';

import { Context } from '../domain/Context';
import { schema } from '../schema/schema';
import { makeContextFromWeb } from './webContext';


export function makeServer(db: PrismaClient): ApolloServer {

  // Create GraphQL Server
  const server = new ApolloServer({
    schema,
    context: (webContext) =>
      makeContextFromWeb(db, webContext),
    plugins: [publicQuery()]
  });

  return server;
}


function publicQuery(): ApolloServerPlugin<Context> {
  return {
    requestDidStart() {
      return {
        didResolveOperation(context) {
          // TODO: Pending work over first level restrictions
          // context.operation.selectionSet.selections.every((x) => true);

          // Used for public APIs
          // Reject the request if not authenticated and requesting non-public APIs.
          if (false) {
            throw new AuthenticationError('not supported');
          }
        }
      };
    }
  };
}
