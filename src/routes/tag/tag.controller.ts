import {RequestHandler} from 'express';
import CreateTagService from './services/CreateTagService';

export default class TagController {
  postTag(): RequestHandler {
    return async (req, res) => {
      const {name} = req.body;

      const createTagService = new CreateTagService();
      const tag = await createTagService.execute({name});

      return res.json(tag);
    };
  }
}
