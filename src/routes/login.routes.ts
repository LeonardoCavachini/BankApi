
import { LoginController } from '../controllers';
import RouteConfig from './common.routes.config';
import validateJWT from '../auth/validateJWT';

class LoginRoutes extends RouteConfig {


  private LoginController: LoginController;

  constructor() {
    super();
    this.LoginController = new LoginController();
    this.configureRoutes();
  }

  configureRoutes() {
    this.router.post(
      '/login',
      this.LoginController.login,
    );
  }
}

export default LoginRoutes;