import { Body, Controller, Get, Post } from '@nestjs/common';
import { BreedService } from './breed.service';

@Controller('breeds')
export class BreedController {
  constructor(private readonly breedService: BreedService) {}

  @Get()
  async getAllBreeds() {
    return await this.breedService.getAllBreeds();
  }

  @Post()
  async createBreed(@Body('name') name: string) {
    return await this.breedService.createBreed(name);
  }
}
