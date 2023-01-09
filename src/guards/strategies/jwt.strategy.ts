import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../../modules/auth/auth.service';
import { jwtConfig } from '../../config/jwt-config';
import { JwtService } from '@nestjs/jwt';
import { parseCookie } from '../../utils/parse-cookie';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService,
    authService: AuthService,
    private jwtService: JwtService,
  ) {
    super({
      jwtFromRequest: (request) =>
        authService.cookieExtractor({
          cookieName: jwtConfig.accessTokenName,
          request,
        }),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET_KEY'),
      usernameField: 'email',
      signOptions: {
        expiresIn: jwtConfig.accessAge,
      },
      passReqToCallback: true,
    });
  }

  async validate(req, { email, password }) {
    const accessToken = parseCookie(req.headers.cookie).access_token;
    const user = this.jwtService.decode(accessToken);
    if (typeof user !== 'string') {
      return { password, email, _id: user._id };
    }
    return { password, email };
  }
}
