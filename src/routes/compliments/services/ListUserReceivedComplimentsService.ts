import {getCustomRepository} from 'typeorm';
import ComplimentRepository from '../compliment.repository';

interface IServiceRequest {
  userId: string;
}

export default class ListUserReceivedComplimentsService {
  async execute({userId}: IServiceRequest) {
    const complimentRepository = getCustomRepository(ComplimentRepository);

    const compliments = await complimentRepository.find({
      where: {
        userReceiverId: userId,
      },
      relations: ['userSender', 'userReceiver', 'tag'],
    });

    return compliments;
  }
}
