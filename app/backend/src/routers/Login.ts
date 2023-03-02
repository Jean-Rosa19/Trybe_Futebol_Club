import { Router } from 'express';
import fieldsValidate from '../middlewares/loginValidation';
import LoginController from '../controllers/LoginController';

const loginRouter = Router();

loginRouter.post('/', fieldsValidate, LoginController.checkLogin);

export default loginRouter;
