import { Request, Response } from 'express';
import { IUser } from '../interfaces/IUserRepository';
import AccountService from '../service/accountUser';

class AccountController {
  private AccountService: AccountService;

  constructor() {
    this.AccountService = new AccountService();
    this.show = this.show.bind(this)
  }

  async show(req: Request, res: Response) {
    try {
      const {username}: IUser  = req.params;
      const account = await this.AccountService.getAccount(username);

      if (account.message) {
        return res.status(account.code).json({ message: account.message });
      }

      res.status(200).json(account);
    } catch (error) {
      const message = error as string;
      throw new Error(message)
    }
  }
}

export default AccountController;