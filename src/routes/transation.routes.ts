
import { TransationController } from '../controllers';
import RouteConfig from './common.routes.config';
import validateJWT from '../auth/validateJWT';

class TransationRoutes extends RouteConfig {


  private TransationController: TransationController;

  constructor() {
    super();
    this.TransationController = new TransationController();
    this.configureRoutes();
  }

  configureRoutes() {
    this.router.post(
      '/transation',
      validateJWT,
      this.TransationController.transation,
    );
    this.router.post(
      '/transation/detail/:username',
      validateJWT,
      this.TransationController.detail,
    );
    this.router.post(
      '/transation/filter',
      validateJWT,
      this.TransationController.transactionFilter,
    );
  }
}

export default TransationRoutes;