import { Auth } from '../../service/auth';
import { form, FormField, required, email, submit } from '@angular/forms/signals';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Storage } from '../../service/storage';
import { Cookie } from '../../service/cookie';
import { ChangeDetectorRef, Component, signal } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [FormField, CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  protected readonly loginModel = signal({
    email: '',
    password: ''
  });

  protected readonly loginForm = form(this.loginModel, (path) => {
    required(path.email, { message: 'Email is required' });
    email(path.email, { message: 'Invalid email format' });
    required(path.password, { message: 'Password is required' });
  });
    loading = false;
    submitted = false;

    message = null;

    constructor(
        private authService: Auth,
        private formBuilder: FormBuilder,
        private router: Router,
        private storageService: Storage,
        private cookieService: Cookie,
        private cdr: ChangeDetectorRef,
    ) { }

    ngOnInit() {
    }

    onSubmit(event: any) {
      event.preventDefault();
      this.submitted = true;
      this.message = null;
      this.cdr.markForCheck()
      submit(this.loginForm, async () => {
        this.loading = true;
        this.authService.login(this.loginForm.email().value(), this.loginForm.password().value()).subscribe((res: any)=>{
          console.log(res);
          this.storageService.set('userData', JSON.stringify(res.data))
          this.cookieService.set('accessToken', res.accessToken)
          this.cookieService.set('refreshToken', res.refreshToken)
          this.router.navigateByUrl('/account/profile');
          this.loading = false;
          this.cdr.markForCheck()
        }, (err)=>{
          this.message = err.error?.message ? err.error?.message : 'Something went wrong please try again';
          this.loading = false;
          this.cdr.markForCheck()
          console.log(err);
        })
      });
    }
}
