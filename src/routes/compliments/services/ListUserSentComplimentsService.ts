import {getCustomRepository} from 'typeorm';
import ComplimentRepository from '../compliment.repository';

interface IServiceRequest {
  userId: string;
}

export default class ListUserSentComplimentsService {
  async execute({userId}: IServiceRequest) {
    const complimentRepository = getCustomRepository(ComplimentRepository);

    const compliments = await complimentRepository.find({
      where: {
        userSenderId: userId,
      },
      relations: ['userSender', 'userReceiver', 'tag'],
    });

    return compliments;
  }
}
