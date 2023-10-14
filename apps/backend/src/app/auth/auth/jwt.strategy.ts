import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(/*private readonly authService: AuthService*/) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        'q8g4WqHtHgAJM2G69z9OkcIy0aN/HPEzzy5R2/7HUh/8w4hp/EZz4NXxUWSzddUhxA3a4Pj5x627HlXpWEg5DlYhzyn5dgTSX+Mjl46EOip8JE+QnZRZgTUVO80xw7uqaVtVZ6sFtDK6rv8+HWBkDyrdlf9Rbidf7qg/cuNjxoOz/pvaize7DRogi3YeHwknFlwD604GGxxtyGBQugQHHY41NBrKzhgVYdxhRnBQTST8DD9zndaC8l4KmQ2b1P6JK2Jz0pAZcsHR5Wh3K3M+t86ecXkezk8UOFU+XRqOsmmB/VzCoHo/vhXCcJ85KJ48T0IE3TjqD2s+YvD8bYR+Sw==',
    });
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  async validate(payload, done: Function) {
    try {
      // You could add a function to the authService to verify the claims of the token:
      // i.e. does the user still have the roles that are claimed by the token
      //const validClaims = await this.authService.verifyTokenClaims(payload);

      //if (!validClaims)
      //    return done(new UnauthorizedException('invalid token claims'), false);

      done(null, payload);
    } catch (err) {
      throw new UnauthorizedException('unauthorized', err.message);
    }
  }
}
