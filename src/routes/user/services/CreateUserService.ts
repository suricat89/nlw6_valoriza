import UserRepository from '../user.repository';
import {getCustomRepository} from 'typeorm';
import {hash} from 'bcryptjs';
import {PreconditionFailed} from '../../../common/errors';
import {classToPlain} from 'class-transformer';
import {UserModel} from '../user.model';

interface IServiceRequest {
  name: string;
  password: string;
  email: string;
  admin?: boolean;
}

export default class CreateUserService {
  async execute({name, password, email, admin}: IServiceRequest) {
    const usersRepository = getCustomRepository(UserRepository);

    const userAlreadyExists = await usersRepository.findOne({
      email,
    });

    if (userAlreadyExists) {
      throw new PreconditionFailed('User already exists');
    }

    const passwordHash = await hash(password, 8);
    const user = usersRepository.create({
      name,
      password: passwordHash,
      email,
      admin,
    });

    await usersRepository.save(user);

    return classToPlain(user) as UserModel;
  }
}
