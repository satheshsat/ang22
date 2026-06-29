import { HttpClient, HttpInterceptorFn } from '@angular/common/http';
import { Cookie } from '../service/cookie';
import { jwtDecode } from "jwt-decode";
import { catchError, map, skip, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
const url = 'https://expressjs-murex.vercel.app/api/auth/';
export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(Cookie);
  const router = inject(Router);
  const http = inject(HttpClient)
  const token = cookieService.get('accessToken');
  if(req.url.indexOf('/auth') != -1){
    return next(req);
  }
  if(!token){
    router.navigateByUrl('/auth/login');
    return next(req);
  }
  if(!isTokenValid(token)){
    return http.post(url+'refresh', {refreshToken:cookieService.get('refreshToken')}, {headers:{ skip: 'true'}})
    .pipe(switchMap((res: any) => {

      if(!res['accessToken']){
        cookieService.remove('accessToken');
        router.navigateByUrl('/auth/login');
        return throwError(() => new Error('Session expired'));
      }
      cookieService.set('accessToken', res['accessToken']);
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer '+res['accessToken']
        } 
      });
      return next(req);
  }), catchError((err) => {
    cookieService.remove('accessToken');
    router.navigateByUrl('/auth/login');
    return throwError(() => new Error('Session expired'));  
  }));
  }else{
    req = req.clone({
      setHeaders: {
        Authorization: 'Bearer '+token
      } 
    });
    return next(req);
  }
};

function isTokenValid(token: any): boolean {
  if (!token) {
      return false;
  }
  return (new Date().getTime() / 1000) < (jwtDecode(token)['exp'] as number);
}