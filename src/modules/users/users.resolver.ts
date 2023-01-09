import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './schemas/users.schema';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CurrentUser } from '../../utils/decorators/current-user';

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

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
