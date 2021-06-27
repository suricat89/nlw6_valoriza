import {RequestHandler} from 'express';
import Controller from '../../common/controller';
import CreateTagService from './services/CreateTagService';
import ListTagService from './services/ListTagService';

export default class TagController extends Controller {
  postTag(): RequestHandler {
    return async (req, res) => {
      const {name} = req.body;

      const createTagService = new CreateTagService();
      const tag = await createTagService.execute({name});

      return res.json(tag);
    };
  }

  getTag(): RequestHandler {
    return async (req, res) => {
      const {name, id} = req.query;
      const filterTag = this.sanitizeInput({name, id});

      const listTagService = new ListTagService();
      const tags = await listTagService.execute(filterTag);

      return res.json(tags);
    };
  }
}
