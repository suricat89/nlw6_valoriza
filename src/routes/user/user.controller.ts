import {RequestHandler} from 'express';
import CreateUserService from './services/CreateUserService';

export default class UserController {
  postUser(): RequestHandler {
    return async (req, res) => {
      const {name, email, admin} = req.body;

      const createUserService = new CreateUserService();
      const user = await createUserService.execute({name, email, admin});

      return res.json(user);
    };
  }
}
