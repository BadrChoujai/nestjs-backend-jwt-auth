import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Breed from './breed.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BreedService {
  constructor(
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  ) {}

  async getAllBreeds() {
    return await this.breedRepository.find();
  }

  async createBreed(name: string): Promise<Breed> {
    const newBreed = this.breedRepository.create({
      name,
    });

    await this.breedRepository.save(newBreed);

    return newBreed;
  }
}
