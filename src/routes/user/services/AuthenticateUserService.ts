import {getCustomRepository} from 'typeorm';
import UserRepository from '../user.repository';
import {compare} from 'bcryptjs';
import {sign, SignOptions} from 'jsonwebtoken';
import environment from '../../../config/environment';
import {IJwtData} from '../../../common/types';

interface IServiceRequest {
  email: string;
  password: string;
}

export default class AuthenticateUserService {
  async execute({email, password}: IServiceRequest) {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne({email});

    if (!user) {
      throw new Error('Email/password incorrect');
    }

    const validatePassword = await compare(password, user.password);
    if (!validatePassword) {
      throw new Error('Email/password incorrect');
    }

    const jwtOptions: SignOptions = {};
    if (environment.jwt.expiresIn) {
      jwtOptions.expiresIn = environment.jwt.expiresIn;
    }

    const token = sign(
      {email: user.email, admin: user.admin, userId: user.id} as IJwtData,
      environment.jwt.secret,
      jwtOptions
    );

    return token;
  }
}
