import {getCustomRepository} from 'typeorm';
import UserRepository from '../../user/user.repository';
import ComplimentRepository from '../compliment.repository';

interface ICreateComplimentRequest {
  tagId: string;
  userSender: string;
  userReceiver: string;
  message: string;
}

export default class CreateComplimentService {
  async execute({
    tagId,
    userSender,
    userReceiver,
    message,
  }: ICreateComplimentRequest) {
    const complimentRepository = getCustomRepository(ComplimentRepository);
    const userRepository = getCustomRepository(UserRepository);

    if (userSender === userReceiver) {
      throw new Error('User receiver and user sender cannot be the same!');
    }

    const userReceiverExists = userRepository.findOne(userReceiver);
    if (!userReceiverExists) {
      throw new Error('User receiver does not exist!');
    }

    const userSenderExists = userRepository.findOne(userSender);
    if (!userSenderExists) {
      throw new Error('User sender does not exist!');
    }

    const compliment = complimentRepository.create({
      tagId: tagId,
      userReceiverId: userReceiver,
      userSenderId: userSender,
      message,
    });

    await complimentRepository.save(compliment);
    return compliment;
  }
}
