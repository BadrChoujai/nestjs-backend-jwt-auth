import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Cat from './cat.entity';
import { Repository } from 'typeorm';
import Breed from 'src/breed/breed.entity';

@Injectable()
export class CatService {
  constructor(
    @InjectRepository(Cat) private catRepository: Repository<Cat>,
    @InjectRepository(Breed) private breedRepository: Repository<Breed>,
  ) {}

  async getCats(): Promise<Cat[]> {
    const cats = await this.catRepository.find({
      relations: {
        breed: true,
      },
    });

    return cats;
  }

  async getCatById(id: number): Promise<Cat> {
    const cats = await this.catRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        breed: true,
      },
    });

    return cats;
  }

  async createCat(name: string, color: string, breedId: number): Promise<Cat> {
    const breed = await this.breedRepository.findOne({
      where: { id: breedId },
    });

    if (!breed) {
      throw new Error('Breed not found');
    }

    const newCat = this.catRepository.create({ name, color, breed });

    return this.catRepository.save(newCat);
  }
}
