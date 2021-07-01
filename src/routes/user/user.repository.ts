import {EntityRepository, Repository} from 'typeorm';
import {UserModel} from './user.model';

@EntityRepository(UserModel)
export default class UserRepository extends Repository<UserModel> {}
