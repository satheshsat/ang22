import { Component, inject } from '@angular/core';
import { Auth } from '../../service/auth';
import { Router } from '@angular/router';
import { Storage } from '../../service/storage';
import { Cookie } from '../../service/cookie';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  authService = inject(Auth);
  router = inject(Router);
  storageService = inject(Storage);
  cookieService = inject(Cookie);
  ngOnInit() {
    this.profile();
  }

  profile(){
    this.authService.profile().subscribe((res)=>{
      console.log(res);
    })
  }

  logout(){
    this.authService.logout().subscribe((res)=>{
      console.log(res);
      this.storageService.clear();
      this.cookieService.remove('accessToken');
      this.cookieService.remove('refreshToken');
      this.router.navigateByUrl('/auth/login')
    })
  }
}
