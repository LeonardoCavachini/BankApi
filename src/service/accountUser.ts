import { prismaClient } from '../database/prismaClient';
import statusCodes from 'http-status-codes';
import { IUSer, IResponse, IAccountResponse } from '../interfaces/IUserRepository';

class AccountService {

  async getAccount(username: string):Promise<IAccountResponse> {
    
    const searchUser: IUSer | null = await prismaClient.user.findUnique({ where: { username } });

    if (!searchUser) {
      return { code: statusCodes.OK, message: 'user does not exists' };
    } else {
      const userAccount = await prismaClient.account.findUnique({
        where: {
          id:searchUser.accountId
        }
      })
      return { code: statusCodes.OK, data:userAccount };
    }
  }
}

export default AccountService;