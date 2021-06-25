import {RequestHandler} from 'express';
import CreateComplimentService from './services/CreateComplimentService';

export default class ComplimentController {
  postCompliment(): RequestHandler {
    return async (req, res) => {
      const {message, tagId, userReceiver, userSender} = req.body;

      const createComplimentService = new CreateComplimentService();
      const compliment = await createComplimentService.execute({
        message,
        tagId,
        userReceiver,
        userSender,
      });

      return res.json(compliment);
    };
  }
}
