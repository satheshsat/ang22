import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { Cookie } from '../service/cookie';

export const accountGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router);
  const cookieService = inject(Cookie);
  if(cookieService.get('accessToken')){
    return true;  
  }
  router.navigateByUrl('/auth/login');
  return false;
};