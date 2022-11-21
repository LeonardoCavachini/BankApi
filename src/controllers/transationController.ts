import { Request, Response } from 'express';
import { IUser } from '../interfaces/IUserRepository';
import TranstionService from '../service/transationUser';

class TransationController {
  private TranstionService: TranstionService;

  constructor() {
    this.TranstionService = new TranstionService();
    this.transation = this.transation.bind(this)
    this.detail = this.detail.bind(this)
    this.transactionFilter = this.transactionFilter.bind(this)
  }

  async transation(req: Request, res: Response) {
    try {
      const {usernameC, usernameD, value} = req.body;
      const account = await this.TranstionService.transation(usernameC, usernameD, value);

      res.status(200).json({message:account.message});
    } catch (error) {
      const message = error as string;
      throw new Error(message)
    }
  };

  async detail(req: Request, res: Response) {
    try {
      const {username} = req.params;

      const detail = await this.TranstionService.getTransation(username);

      if (detail.message) {
        return res.status(detail.code).json({ message: detail.message });
      }

      res.status(200).json(detail.data);
    } catch (error) {
      const message = error as string;
      throw new Error(message)
    }
  };

  async transactionFilter(req: Request, res: Response) {
    const accountCredit = req.query.accountCredit as string
    const accountDebit = req.query.accountDebit as string
    const date = req.query.date as string
    if(accountCredit) {
      try {

        const filter = await this.TranstionService.filterCredit(accountCredit);
  
        res.status(200).json(filter.data);
      } catch (error) {
        const message = error as string;
        throw new Error(message)
      }
    } else if (date){
      try {

        const filter = await this.TranstionService.filterDate(date);
  
        res.status(200).json(filter.data);
      } catch (error) {
        const message = error as string;
        throw new Error(message)
      }
    } else if(accountDebit) {
      try {

        const filter = await this.TranstionService.filterDebit(accountDebit);
  
        res.status(200).json(filter.data);
      } catch (error) {
        const message = error as string;
        throw new Error(message)
      }
    }else {
      res.status(200).json(['fodasse']);
    }
  }
}

export default TransationController;