import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './schemas/users.schema';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CurrentUser } from '../../utils/decorators/current-user';
import { Film } from './schemas/films.schema';
import { boolean } from 'joi';

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async addFilm(
    @Args('kinopoiskId', { type: () => Number }) kinopoiskId: number,
    @CurrentUser() user,
  ) {
    return await this.usersService.addFilm({ kinopoiskId, userId: user._id });
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async deleteFilm(
    @Args('kinopoiskId', { type: () => Number }) kinopoiskId: number,
    @CurrentUser() user,
  ) {
    return await this.usersService.deleteFilm({
      kinopoiskId,
      userId: user._id,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Film])
  getFilms(@CurrentUser() user) {
    return this.usersService.getUserFilms({ userId: user._id });
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => String)
  async createSubscription(
    @Args('recipientId', { type: () => String }) recipientId: string,
    @CurrentUser() user,
  ) {
    return await this.usersService.subscribeUser(user._id, recipientId);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [User])
  getSubscriptions(@CurrentUser() user) {
    return this.usersService.getSubscriptions(user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [User])
  getSubscribers(@CurrentUser() user) {
    return this.usersService.getSubscribers(user._id);
  }
}
