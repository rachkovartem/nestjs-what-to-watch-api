import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../../modules/auth/auth.service';
import { jwtConfig } from '../../config/jwt-config';
import { parseCookie } from '../../utils/parse-cookie';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    configService: ConfigService,
    authService: AuthService,
    private jwtService: JwtService,
  ) {
    super({
      jwtFromRequest: (request) =>
        authService.cookieExtractor({
          cookieName: jwtConfig.refreshTokenName,
          request,
        }),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET_KEY'),
      usernameField: 'email',
      signOptions: {
        expiresIn: jwtConfig.refreshAge,
      },
      passReqToCallback: true,
    });
  }

  async validate(req, { email, password }) {
    const refreshToken = parseCookie(req.headers.cookie).refresh_token;
    const user = this.jwtService.decode(refreshToken);
    if (typeof user !== 'string') {
      return { password, email, _id: user._id };
    }
    return { password, email };
  }
}
