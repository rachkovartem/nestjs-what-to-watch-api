import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Post, PostContent } from './schemas/post.schema';

@Injectable()
export class PostsService {
  constructor(
    @Inject('POST_MODEL')
    private postModel: Model<Post>,
  ) {}

  async createPost(postData: PostContent, userId: string) {
    const post = new this.postModel({ content: postData, author: userId });
    return await post.save();
  }

  async getUserPosts(userId: string) {
    try {
      return await this.postModel.find({
        author: userId,
      });
    } catch (err) {}
  }

  async likePost(postId: string, userId) {
    try {
      return await this.postModel.findByIdAndUpdate(
        postId,
        {
          $addToSet: {
            likes: userId,
          },
        },
        { new: true },
      );
    } catch (error) {
      throw error;
    }
  }

  async dislikePost(postId: string, userId) {
    try {
      return await this.postModel.findByIdAndUpdate(
        postId,
        {
          $pull: {
            likes: userId,
          },
        },
        { new: true },
      );
    } catch (error) {
      throw error;
    }
  }
}
