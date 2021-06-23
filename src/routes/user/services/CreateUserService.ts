import UserRepository from '../user.repository';
import {getCustomRepository} from 'typeorm';

interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean;
}

export default class CreateUserService {
  async execute({name, email, admin}: IUserRequest) {
    const usersRepository = getCustomRepository(UserRepository);

    if (!email) {
      throw new Error('Invalid email');
    }

    const userAlreadyExists = await usersRepository.findOne({
      email,
    });

    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    const user = usersRepository.create({
      name,
      email,
      admin,
    });

    await usersRepository.save(user);

    return user;
  }
}
