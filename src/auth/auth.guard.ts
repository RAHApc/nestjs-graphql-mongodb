import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AllowedRoles } from './setRole.decotor';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';
import { USER_KEY } from 'src/common/common.constant';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<AllowedRoles[]>(
      'roles',
      context.getHandler(),
    );

    if (!roles) return true;

    const user = this.getUser(context);
    if (!user) throw new UnauthorizedException('Please log into your account!');

    if (roles.includes('Any')) return true;

    if (!roles.includes(user.role))
      throw new ForbiddenException(
        'You are not allowed to access this action!',
      );

    return true;
  }

  getUser(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context).getContext();
    return gqlContext[USER_KEY];
  }
}
