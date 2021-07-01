import {FindManyOptions, getCustomRepository} from 'typeorm';
import UserRepository from '../user.repository';
import {classToPlain} from 'class-transformer';
import {UserModel} from '../user.model';

export default class ListUserService {
  async execute(filterUser?: unknown) {
    const userRepository = getCustomRepository(UserRepository);

    const repositoryFilter: FindManyOptions<UserModel> = {};
    if (filterUser) {
      repositoryFilter.where = filterUser;
    }
    const users = await userRepository.find(repositoryFilter);

    return classToPlain(users) as UserModel[];
  }
}
