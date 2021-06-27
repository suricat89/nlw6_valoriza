import {RequestHandler} from 'express';
import CreateComplimentService from './services/CreateComplimentService';
import ListUserReceivedComplimentsService from './services/ListUserReceivedComplimentsService';
import ListUserSentComplimentsService from './services/ListUserSentComplimentsService';

export default class ComplimentController {
  postCompliment(): RequestHandler {
    return async (req, res) => {
      const {message, tagId, userReceiver} = req.body;
      const userSender = req.authenticated.userId;

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

  getComplimentReceived(): RequestHandler {
    return async (req, res) => {
      const {userId} = req.params;

      const listUserReceivedComplimentsService =
        new ListUserReceivedComplimentsService();
      const compliments = await listUserReceivedComplimentsService.execute({
        userId,
      });

      return res.json(compliments);
    };
  }

  getComplimentSent(): RequestHandler {
    return async (req, res) => {
      const {userId} = req.params;

      const listUserSentComplimentsService =
        new ListUserSentComplimentsService();
      const compliments = await listUserSentComplimentsService.execute({
        userId,
      });

      return res.json(compliments);
    };
  }
}
