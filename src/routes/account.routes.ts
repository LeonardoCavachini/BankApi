import { AccountController } from '../controllers';
import RouteConfig from './common.routes.config';
import validateJWT from '../auth/validateJWT';

class AccountRoutes extends RouteConfig {


  private AccountController: AccountController;

  constructor() {
    super();
    this.AccountController = new AccountController();
    this.configureRoutes();
  }

  configureRoutes() {
    this.router.post(
      '/account/:username',
      validateJWT,
      this.AccountController.show,
    );
  }
}

export default AccountRoutes;