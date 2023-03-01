import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { getId } from '../utils/getId';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../users/user.repository';
import { UserService } from '../users/user.service';

@Injectable()
export class CheckUserMiddleware implements NestMiddleware {
  constructor(private userService: UserService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const id = getId(req.headers['authorization']);
      const user = await this.userService.getOne(id);
      if (user !== null) {
        next();
      } else {
        await this.userService.create({ id });
        next();
      }
    } catch (e) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
