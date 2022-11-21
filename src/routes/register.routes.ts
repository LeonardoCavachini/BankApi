import { RegisterController }  from '../controllers';
import RouteConfig from './common.routes.config';
import {validateUserName} from '../middleware/checkUser';

class RegisterRoutes extends RouteConfig {
  private RegisterController: RegisterController;

  constructor() {
    super();
    this.RegisterController = new RegisterController();
    this.configureRoutes();
  }

  configureRoutes() {
    this.router.post(
      '/register',
      validateUserName,
      this.RegisterController.register,
    );
  }
}

export default RegisterRoutes;