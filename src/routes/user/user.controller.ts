import {RequestHandler} from 'express';
import AuthenticateUserService from './services/AuthenticateUserService';
import CreateUserService from './services/CreateUserService';

export default class UserController {
  postUser(): RequestHandler {
    return async (req, res) => {
      const {name, password, email, admin = false} = req.body;

      const createUserService = new CreateUserService();
      const user = await createUserService.execute({
        name,
        password,
        email,
        admin,
      });

      return res.json(user);
    };
  }

  postUserAuthenticate(): RequestHandler {
    return async (req, res) => {
      const {email, password} = req.body;

      const authenticateUserService = new AuthenticateUserService();
      const token = await authenticateUserService.execute({
        email,
        password,
      });

      return res.json({
        token,
      });
    };
  }
}
