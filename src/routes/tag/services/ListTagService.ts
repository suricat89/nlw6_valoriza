import {FindManyOptions, getCustomRepository} from 'typeorm';
import TagRepository from '../tag.repository';
import {classToPlain} from 'class-transformer';
import Tag from '../tag.model';

export default class ListTagService {
  async execute(filterTag?: unknown) {
    const tagRepository = getCustomRepository(TagRepository);

    const repositoryFilter: FindManyOptions<Tag> = {};
    if (filterTag) {
      repositoryFilter.where = filterTag;
    }
    const tags = await tagRepository.find(repositoryFilter);

    return classToPlain(tags) as Tag[];
  }
}
