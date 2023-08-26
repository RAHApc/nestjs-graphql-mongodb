import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { UserService } from 'src/user/user.service';
import { NextFunction, Request, Response } from 'express';
import { JWT_TOKEN, USER_KEY } from 'src/common/common.constant';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = this.verifyToken(req);
      if (typeof payload === 'object' && payload.hasOwnProperty('id')) {
        req[USER_KEY] = await this.userService.findById(payload.id);
      }
    } catch (error) {}
    next();
  }

  verifyToken(req: Request) {
    if (JWT_TOKEN in req.headers) {
      const token = req.headers[JWT_TOKEN];
      return this.jwtService.verify(token.toString());
    }
  }
}
