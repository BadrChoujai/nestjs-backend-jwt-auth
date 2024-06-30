import { Module } from '@nestjs/common';
import { CatController } from './cat.controller';
import { CatService } from './cat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Cat from './cat.entity';
import { BreedModule } from 'src/breed/breed.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cat]), BreedModule],
  providers: [CatService],
  controllers: [CatController],
})
export class CatModule {}
