import {EntityRepository, Repository} from 'typeorm';
import ComplimentModel from './compliments.model';

@EntityRepository(ComplimentModel)
export default class ComplimentRepository extends Repository<ComplimentModel> {}
