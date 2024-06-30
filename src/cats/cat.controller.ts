import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CatService } from './cat.service';
import Cat from './cat.entity';
import { CreateCatDto } from './dto/cat.dto';
import JwtAuthGuard from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('cats')
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getCats(): Promise<Cat[]> {
    return await this.catService.getCats();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getCatById(@Param('id') id: string): Promise<Cat> {
    return await this.catService.getCatById(Number(id));
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createCat(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    const { name, color, breedId } = createCatDto;

    return await this.catService.createCat(name, color, breedId);
  }
}
