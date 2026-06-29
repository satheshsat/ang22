import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Service()
export class Auth {
    url = 'https://expressjs-murex.vercel.app/api/auth/';
  url2 = 'https://expressjs-murex.vercel.app/api/';

  http = inject(HttpClient);

  login(email: string, password: string) {
    return this.http.post(this.url+'login', { email, password });
  }

  register(data: any) {
    return this.http.post(this.url+'register', data);
  }

  resetpass(email: string){
    return this.http.post(this.url+'resetpass', { email });
  }

  logout(){
    return this.http.post(this.url+'logout', {});
  }

  profile(){
    return this.http.get(this.url2+'profile', {});
  }
}
