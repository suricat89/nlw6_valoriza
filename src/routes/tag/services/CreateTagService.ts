import {getCustomRepository} from 'typeorm';
import {PreconditionFailed} from '../../../common/errors';
import TagRepository from '../tag.repository';

export interface IServiceRequest {
  name: string;
}

export default class CreateTagService {
  async execute({name}: IServiceRequest) {
    const tagRepository = getCustomRepository(TagRepository);

    if (!name) {
      throw new PreconditionFailed('Invalid name');
    }

    const tagAlreadyExists = await tagRepository.findOne({name});

    if (tagAlreadyExists) {
      throw new PreconditionFailed('Tag already exists');
    }

    const tag = tagRepository.create({
      name,
    });

    await tagRepository.save(tag);
    return tag;
  }
}
