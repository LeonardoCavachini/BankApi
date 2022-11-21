import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
import { Response, NextFunction, Request } from 'express';
import jwtConfig from '../utils';
import { prismaClient } from '../database/prismaClient';

interface TokenPayload {
  username: string;
}

interface RequestData extends Request {
  username?: TokenPayload
}

async function findUserName(username: string) {
  const user = await prismaClient.user.findUnique({ where: { username },
  }) || undefined;
  return user;
}

export default async (req: RequestData, res: Response, next: NextFunction) => {
  const secret = jwtConfig.jwt.secret as unknown as string;

  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json('Token not found');
  }

  try {
    const decoded = jwt.verify(token, secret, { algorithms: ['HS256'] }) as jwt.JwtPayload;
    const receivedUsername = decoded.sub as string;
    const username = await findUserName(receivedUsername);

    req.username = username;

    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: 'Invalid token', err });
  }
};