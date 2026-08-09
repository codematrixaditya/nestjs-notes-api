import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const role = request.get('role');

    if (typeof role !== 'string' || role !== 'admin') {
      throw new UnauthorizedException(
        'Access denied: You do not have the required role to access this resource.',
      );
    }

    return true;
  }
}
