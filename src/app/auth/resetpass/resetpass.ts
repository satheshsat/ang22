import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../service/auth';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resetpass',
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './resetpass.html',
  styleUrl: './resetpass.scss',
})
export class Resetpass {
  form!: FormGroup;
    loading = false;
    submitted = false;
    message = null;

    constructor(
        private authService: Auth,
        private formBuilder: FormBuilder,
        private router: Router,
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9][a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]*?[a-zA-Z0-9._-]?@[a-zA-Z0-9][a-zA-Z0-9._-]*?[a-zA-Z0-9]?\\.[a-zA-Z]{2,63}$")]],
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;
        this.message = null;

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.authService.resetpass(this.f['email'].value).subscribe((res: any)=>{
          console.log(res);
          this.router.navigateByUrl('/auth/login');
        }, (err)=>{
          this.message = err.error?.message ? err.error?.message : 'Something went wrong please try again';
          this.loading = false;
          console.log(err);
        })
    }
}
