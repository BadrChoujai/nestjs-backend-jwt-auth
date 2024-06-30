import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import User from './user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_POST'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [User],
        autoLoadEntities: true,
        // Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
        synchronize: configService.get('NODE_ENV') !== 'production',
        migrations: ['dist/**/migrations/**/*{.ts,.js}'],
        migrationsTableName: 'typeorm_migrations',
        migrationsRun: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
