import {RequestHandler} from 'express';
import Controller from '../../common/controller';
import AuthenticateUserService from './services/AuthenticateUserService';
import CreateUserService from './services/CreateUserService';
import ListUserService from './services/ListUsersService';

export default class UserController extends Controller {
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

  getUser(): RequestHandler {
    return async (req, res) => {
      const {name, email, admin, id} = req.query;
      const userFilter = this.sanitizeInput({name, email, admin, id});

      const listUserService = new ListUserService();
      const users = await listUserService.execute(userFilter);
      return res.json(users);
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
