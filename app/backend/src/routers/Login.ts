import { Router } from 'express';
import fieldsValidate from '../middlewares/loginValidation';
import LoginController from '../controllers/LoginController';

const loginRouter = Router();
const loginController = new LoginController();

loginRouter.post('/', fieldsValidate, (req, res) => loginController.login(req, res));

export default loginRouter;
