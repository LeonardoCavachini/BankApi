import { Request, Response } from 'express';
import LoginService from '../service/loginUser';
import { IUser } from '../interfaces/IUserRepository'

class LoginController {
  private LoginService: LoginService;

  constructor() {
    this.LoginService = new LoginService();
    this.login = this.login.bind(this);
  }

  async login(req: Request, res: Response) {
    const input: IUser = req.body;
    const login = await this.LoginService.login(input);

    if (login.message) {
      return res.status(login.code).json({ message: login.message });
    }

    res.status(200).json(login);
  }
}

export default LoginController;
