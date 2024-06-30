import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Breed from './breed.entity';
import { BreedService } from './breed.service';
import { BreedController } from './breed.controller';

@Module({
  exports: [TypeOrmModule.forFeature([Breed])],
  imports: [TypeOrmModule.forFeature([Breed])],
  providers: [BreedService],
  controllers: [BreedController],
})
export class BreedModule {}