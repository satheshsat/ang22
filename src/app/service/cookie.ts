import { inject, Service } from '@angular/core';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

@Service()
export class Cookie {
    cookieService = inject(SsrCookieService);

  set(key: string, value: string){
    return this.cookieService.set(key, value);
  }

  get(key: string){
    return this.cookieService.get(key);
  }

  remove(key: string){
    return this.cookieService.delete(key, '/');
  }
}
