import {getCustomRepository} from 'typeorm';
import UserRepository from '../user.repository';
import {compare} from 'bcryptjs';
import {sign} from 'jsonwebtoken';
import environment from '../../../config/environment';

interface IAuthenticateUserRequest {
  email: string;
  password: string;
}

export default class AuthenticateUserService {
  async execute({email, password}: IAuthenticateUserRequest) {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne({email});

    if (!user) {
      throw new Error('Email/password incorrect');
    }

    const validatePassword = await compare(password, user.password);
    if (!validatePassword) {
      throw new Error('Email/password incorrect');
    }

    const token = sign(
      {email: user.email, admin: user.admin},
      environment.jwt.secret,
      {
        expiresIn: environment.jwt.expiresIn,
      }
    );

    return token;
  }
}
