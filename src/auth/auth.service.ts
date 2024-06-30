import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Req,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import User from 'src/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostgresErrorCode } from 'database/postgresErrorCodes.enum';
import { RegistrationDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import RequestWithUser from './interfaces/requestWithUser.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userService: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneBy({ email });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isMatch: boolean = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      throw new BadRequestException('Password does not match');
    }

    return user;
  }

  public async register(registrationDto: RegistrationDto): Promise<User> {
    const existingUser = await this.userService.findOneBy({
      email: registrationDto.email,
    });

    try {
      if (existingUser) {
        throw new BadRequestException('email already exists');
      }

      const hashedPassword = await bcrypt.hash(registrationDto.password, 10);
      const newUser: RegistrationDto = {
        ...registrationDto,
        password: hashedPassword,
      };

      const user = await this.userService.create({
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
      });

      return this.userService.save(user);
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          `User with that email already exists`,
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(error?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public loginWithJwtToken(user: LoginDto) {
    try {
      const token = this.jwtService.sign(user);

      return token;
    } catch (error) {
      throw new HttpException(
        `Something went wrong: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public logout(@Req() request: RequestWithUser) {
    try {
      console.log(request);
      // return this.jwtService.si(id);
    } catch (error) {}
  }
}
