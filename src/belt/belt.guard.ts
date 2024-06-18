import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class BeltGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    // This is a example, not implemented

    // const request = context.switchToHttp().getRequest();

    // // validate the request
    // const hasBlackBelt = request.user.belts.includes('black');
    // return hasBlackBelt; // we just know how to toggle the guard on(true) and off(false) based on some condition
  
    return true;
  }
}
