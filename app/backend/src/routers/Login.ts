import { Router } from 'express';
import fieldsValidate from '../middlewares/loginValidation';
import LoginController from '../controllers/LoginController';
import verifyToken from '../middlewares/validatetoken';

const loginRouter = Router();
const loginController = new LoginController();

loginRouter.post('/', fieldsValidate, (req, res) => loginController.login(req, res));
loginRouter.get('/role', verifyToken, (req, res) => loginController.loginRole(req, res));

export default loginRouter;
