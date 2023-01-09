import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ConfigModule } from '@nestjs/config';
import { postsProviders } from './posts.providers';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';

@Module({
  imports: [DatabaseModule, ConfigModule],
  providers: [...postsProviders, PostsService, PostsResolver],
  exports: [PostsService],
})
export class PostsModule {}
