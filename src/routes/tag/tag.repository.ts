import {EntityRepository, Repository} from 'typeorm';
import TagModel from './tag.model';

@EntityRepository(TagModel)
export default class TagRepository extends Repository<TagModel> {}
