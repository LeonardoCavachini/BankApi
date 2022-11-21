import { prismaClient } from '../database/prismaClient';
import statusCodes from 'http-status-codes';
import * as bcrypt from 'bcrypt';
import { IUser, IResponse } from '../interfaces/IUserRepository';

class RegisterService {

  async register(username: string, password:string): Promise<IResponse> {
    
    const searchUser: IUser | null = await prismaClient.user.findUnique({ where: { username } });

    if (searchUser) {
      return { code: statusCodes.OK, message: 'user already exists' };
    } else {
      await prismaClient.user.create({
        data: {
          password:await bcrypt.hash(password,8),
          username,
          account:{
            create: {
              balance:100,
            }
          }
        }
      });
      return { code: statusCodes.CREATED, message: 'user created' };
    }
  }
}

export default RegisterService;
