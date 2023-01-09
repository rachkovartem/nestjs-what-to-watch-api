import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../../utils/decorators/current-user';
import { PostsService } from './posts.service';
import { Post } from './schemas/post.schema';

@Resolver()
export class PostsResolver {
  constructor(private postService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Post)
  async createPost(
    @Args('text', { type: () => String }) text: string,
    @Args('images', { type: () => [String] }) images: string[],
    @Args('videos', { type: () => [String] }) videos: string[],
    @CurrentUser() user,
  ) {
    return await this.postService.createPost(
      {
        text,
        images,
        videos,
      },
      user._id,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Post])
  async myPosts(@CurrentUser() user) {
    return await this.postService.getUserPosts(user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Post)
  async likePost(
    @Args('postId', { type: () => String }) postId: string,
    @CurrentUser() user,
  ) {
    return await this.postService.likePost(postId, user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Post)
  async dislikePost(
    @Args('postId', { type: () => String }) postId: string,
    @CurrentUser() user,
  ) {
    return await this.postService.dislikePost(postId, user._id);
  }
}
