import { Request, Response } from 'express';
import RegisterService from '../service/registerUser';

class CreateUserController {
  private create: RegisterService;

  constructor() {
   this.create = new RegisterService();
   this.register = this.register.bind(this)
  }
  async register(req: Request, res: Response): Promise<void> {
    try {
      const {username, password} = req.body
      const response = await this.create.register(username, password)
      res.status(201).json(response);
    } catch (error) {
      const message = error as string;
      throw new Error(message)
    }
  }
};

export default CreateUserController;
