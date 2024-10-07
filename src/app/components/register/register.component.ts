import { Component, inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  // global property
  isLoading: boolean = false;
  errMsg: string = '';

  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^.{8,}$/),
    ]),
    age: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(1[89]|[2-9][0-9]|[1-9][0-9]{2,})$/),
    ]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(01)[0-2,5]{1}[0-9]{8}$/),
    ]),
  });

  registerData(): void {
    this.isLoading = true;
    this._AuthService.registerForm(this.registerForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.registerForm.reset();

        setTimeout(() => {
          this._Router.navigate(['/login']);
        }, 2000);

        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
        this.errMsg = err.error.msg;
      },
    });
  }
}
