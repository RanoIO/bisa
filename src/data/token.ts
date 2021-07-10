import { PrismaClient } from '@prisma/client';

export function findUserToken(db: PrismaClient, tokenId: string) {
  return db.userToken.findUnique({
    where: {
      id: tokenId
    },
    include: {
      user: {
        include: {
          role: {
            include: {
              role: true
            }
          },
          project: {
            include: {
              publication: {
                include: {
                  project: true
                }
              }
            }
          }
        }
      }
    }
  });
}