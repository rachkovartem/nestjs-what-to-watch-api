import { DatabaseModule } from '../database/database.module';
import { UsersService } from './users.service';
import { Module } from '@nestjs/common';
import { userProviders } from './users.providers';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersResolver } from './users.resolver';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [DatabaseModule, ConfigModule, HttpModule],
  providers: [UsersService, ...userProviders, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
