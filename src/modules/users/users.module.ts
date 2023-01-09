import { DatabaseModule } from '../database/database.module';
import { UsersService } from './users.service';
import { Module } from '@nestjs/common';
import { userProviders } from './users.providers';
import { ConfigModule } from '@nestjs/config';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [DatabaseModule, ConfigModule],
  providers: [UsersService, ...userProviders, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
