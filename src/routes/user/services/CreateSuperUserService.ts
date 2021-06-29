import UserRepository from '../user.repository';
import {getCustomRepository} from 'typeorm';
import {hash} from 'bcryptjs';
import environment from '../../../config/environment';

export default class CreateSuperUserService {
  async execute() {
    const usersRepository = getCustomRepository(UserRepository);

    const userAlreadyExists = await usersRepository.findOne({
      email: 'admin',
    });

    if (userAlreadyExists) {
      return userAlreadyExists;
    }

    const passwordHash = await hash(
      environment.application.superAdminPassword,
      8
    );

    const user = usersRepository.create({
      name: 'admin',
      password: passwordHash,
      email: 'admin',
      admin: true,
    });

    await usersRepository.save(user);

    return user;
  }
}
