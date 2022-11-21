import { prismaClient } from '../database/prismaClient';
import statusCodes from 'http-status-codes';
import { IUser, IAccountResponse } from '../interfaces/IUserRepository';

class TransationService {

  async transation(userCred: string, userDeb: string, value:number):Promise<IAccountResponse> {
    
    const creditUser: IUser | null = await prismaClient.user.findUnique({ where: { username:userCred } });
    const debitUser: IUser | null = await prismaClient.user.findUnique({ where: { username:userDeb } });
    const {balance} = await prismaClient.account.findUnique({where:{id:debitUser.accountId}})

    if (balance < value) {
      return { code: statusCodes.OK, message:'without balance.' };
    } else if (creditUser.username == debitUser.username) {
      return { code: statusCodes.OK, message:'please change onde of the usernames' };
    }
      await prismaClient.account.update({
        where: {
          id:creditUser.accountId
        },
        data: {
          balance:{increment:value}
        }
      });
      await prismaClient.account.update({
        where: {
          id:debitUser.accountId
        },
        data: {
          balance:{decrement:value}
        }
      })
      await prismaClient.transactions.create({
        data:{
          debitedAccountId:debitUser.accountId,
          creditedAccountId:creditUser.accountId,
          value
        }
      })
      return { code: statusCodes.OK, message:'transaction successfully.' };

  };

  async getTransation(username: string) {
    const user: IUser | null = await prismaClient.user.findUnique({ where: { username:username } });

    if (!user) {
      return { code: statusCodes.NOT_FOUND, message: 'user not found' };
    } else {
      const detail = await prismaClient.transactions.findMany({
        where: {
          OR:[
            {
              creditedAccountId:user.accountId
            },
            {
              debitedAccountId:user.accountId
            },
          ]
        }
      })
      if (detail.length<1) {
        return { code: statusCodes.NOT_FOUND, message: 'user does not have any kind of transaction' };
      }
      return { code: statusCodes.OK, data: detail };
    }
  };

  async filterDate(date:string) {
    
      const transactionFilter = await prismaClient.transactions.findMany({
        where: {
          OR:[
            {
              created_at:{equals:new Date(date)}
            },
          ]
        }
      })
      return { code: statusCodes.OK, data: transactionFilter };
  };

  async filterCredit(accountCredit:string) {
    
    const transactionFilter = await prismaClient.transactions.findMany({
      where: {
        OR:[
          {
            creditedAccountId:accountCredit
          },
        ]
      }
    })
    return { code: statusCodes.OK, data: transactionFilter };
  };

  async filterDebit(accountDebit:string) {
    
    const transactionFilter = await prismaClient.transactions.findMany({
      where: {
        OR:[
          {
            debitedAccountId:accountDebit
          },
        ]
      }
    })
    return { code: statusCodes.OK, data: transactionFilter };
  };
}

export default TransationService;