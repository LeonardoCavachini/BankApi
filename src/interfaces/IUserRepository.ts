import { StatusCodes } from 'http-status-codes';

export interface IUser {
  username?: string,
  password?: string,
  accountId?: string;
};

export interface IAccount {
  balance:number;
}

export interface IResponse {
  code: StatusCodes;
  data?: IUser[] | IUser | string;
  message?: string;
  token?:string
}

export interface IAccountResponse {
  code: StatusCodes;
  data?: IAccount[] | IAccount;
  message?: string;
}
