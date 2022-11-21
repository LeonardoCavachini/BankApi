import { prismaClient } from '../database/prismaClient';
import statusCodes from 'http-status-codes';
import compare from '../utils/Bcrypt';
import Token from '../auth/createTokenJWT';
import { IUser, IResponse } from '../interfaces/IUserRepository';

class LoginService{
  private compare = compare;

  private createToken = Token.createToken;

  async login(value: IUser): Promise<IResponse> {
    const { username, password } = value;
    const searchUser: IUser | null = await prismaClient.user.findUnique({ where: { username } });

    if (!searchUser) {
      return { code: statusCodes.NOT_FOUND, message: 'Incorrect email or password' };
    };

    const comparePassword = await this.compare(password, searchUser.password);

    if (!comparePassword) {
      return { code: 401, message: 'Incorrect email or password' };
    };

    const token = this.createToken(searchUser.username);
    
    return { code: statusCodes.OK ,  data: searchUser.username , token };
  }
}

export default LoginService;
