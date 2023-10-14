import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

export enum Provider {
  GOOGLE = 'google',
}

@Injectable()
export class AuthService {
  private readonly JWT_SECRET_KEY =
    'q8g4WqHtHgAJM2G69z9OkcIy0aN/HPEzzy5R2/7HUh/8w4hp/EZz4NXxUWSzddUhxA3a4Pj5x627HlXpWEg5DlYhzyn5dgTSX+Mjl46EOip8JE+QnZRZgTUVO80xw7uqaVtVZ6sFtDK6rv8+HWBkDyrdlf9Rbidf7qg/cuNjxoOz/pvaize7DRogi3YeHwknFlwD604GGxxtyGBQugQHHY41NBrKzhgVYdxhRnBQTST8DD9zndaC8l4KmQ2b1P6JK2Jz0pAZcsHR5Wh3K3M+t86ecXkezk8UOFU+XRqOsmmB/VzCoHo/vhXCcJ85KJ48T0IE3TjqD2s+YvD8bYR+Sw=='; // <- replace this with your secret key

  constructor(/*private readonly usersService: UsersService*/) {}

  async validateOAuthLogin(
    thirdPartyId: string,
    provider: Provider,
  ): Promise<string> {
    try {
      // You can add some registration logic here,
      // to register the user using their thirdPartyId (in this case their googleId)
      // let user: IUser = await this.usersService.findOneByThirdPartyId(thirdPartyId, provider);

      // if (!user)
      // user = await this.usersService.registerOAuthUser(thirdPartyId, provider);

      // resuable if want to add more providers like facebook, twitter, github, etc
      const payload = {
        thirdPartyId,
        provider,
      };

      // create a jwt that is valid for 1 hour
      const jwt: string = sign(payload, this.JWT_SECRET_KEY, {
        expiresIn: 3600,
      });
      return jwt;
    } catch (err) {
      throw new InternalServerErrorException('validateOAuthLogin', err.message);
    }
  }
}
