import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from '../users/users.service';
import { User, UserOmitPassword } from '../users/schemas/users.schema';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../../guards/local-auth.guard';
import { AuthService } from './auth.service';
import { jwtConfig } from '../../config/jwt-config';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CurrentUser } from '../../utils/decorators/current-user';
import { JwtRefreshAuthGuard } from '../../guards/jwt-refresh-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Query(() => UserOmitPassword)
  async login(
    @Args('email', { type: () => String }) email: string,
    @Args('password', { type: () => String }) password: string,
    @Context() ctx,
  ) {
    const { accessToken, refreshToken, fullUser } =
      await this.authService.login(ctx.req.body);

    ctx.res.cookie(jwtConfig.accessTokenName, accessToken, {
      maxAge: jwtConfig.accessAge,
      httpOnly: jwtConfig.httpOnly,
      sameSite: jwtConfig.sameSite,
      secure: jwtConfig.secure,
    });

    ctx.res.cookie(jwtConfig.refreshTokenName, refreshToken, {
      maxAge: jwtConfig.refreshAge,
      httpOnly: jwtConfig.httpOnly,
      sameSite: jwtConfig.sameSite,
      secure: jwtConfig.secure,
    });

    return fullUser;
  }

  @Mutation(() => UserOmitPassword)
  async createUser(
    @Args('name', { type: () => String }) name: string,
    @Args('email', { type: () => String }) email: string,
    @Args('password', { type: () => String }) password: string,
  ) {
    try {
      return await this.usersService.create({
        name,
        email,
        password,
      });
    } catch (error) {
      return error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => User)
  async profile(@CurrentUser() user) {
    try {
      return await this.usersService.getUser(user.email);
    } catch (error) {
      return error;
    }
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Query(() => String)
  async refresh(@Context() ctx, @CurrentUser() user) {
    const accessToken = this.authService.getAccessToken(user);
    ctx.res.cookie(jwtConfig.accessTokenName, accessToken, {
      maxAge: jwtConfig.accessAge,
      httpOnly: jwtConfig.httpOnly,
      sameSite: jwtConfig.sameSite,
      secure: jwtConfig.secure,
    });
    return 'tokenUpdated';
  }
}
