import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../service/auth';
import { form, FormField, required, email, submit } from '@angular/forms/signals';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormField, CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  protected readonly registerModel = signal({
    name: '',
    email: '',
    password: ''
  });

  protected readonly registerForm = form(this.registerModel, (path) => {
    required(path.name, { message: 'Email is required' });
    required(path.email, { message: 'Email is required' });
    email(path.email, { message: 'Invalid email format' });
    required(path.password, { message: 'Password is required' });
  });

  loading = false;
  submitted = false;
  message = null;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private authService: Auth,
  ) { }

  ngOnInit() {
  }

  onSubmit(event: any) {
      event.preventDefault();
      this.submitted = true;
      this.message = null;

      console.log(this.registerModel)
      submit(this.registerForm, async () => {
        this.loading = true;
      this.authService.register(this.registerModel()).subscribe((res)=>{
        this.router.navigateByUrl('/auth/login');
      },err => {
        this.message = err.error?.message ? err.error?.message : 'Something went wrong please try again';
        this.loading = false;
      })
    });
    }
}
