import {FindManyOptions, getCustomRepository} from 'typeorm';
import UserRepository from '../user.repository';
import {classToPlain} from 'class-transformer';
import User from '../user.model';

export default class ListUserService {
  async execute(filterUser?: unknown) {
    const userRepository = getCustomRepository(UserRepository);

    const repositoryFilter: FindManyOptions<User> = {};
    if (filterUser) {
      repositoryFilter.where = filterUser;
    }
    const users = await userRepository.find(repositoryFilter);

    return classToPlain(users) as User[];
  }
}
