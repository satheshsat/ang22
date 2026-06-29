import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { Cookie } from '../service/cookie';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router);
  const cookieService = inject(Cookie);
  if(cookieService.get('accessToken')){
    router.navigateByUrl('/account/profile');
    return false;  
  }
  return true;
};