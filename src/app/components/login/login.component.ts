import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  // global property
  isLoading: boolean = false;
  errMsg: string = '';

  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^.{8,}$/),
    ]),
  });

  loginData(): void {
    this.isLoading = true;
    this._AuthService.loginForm(this.loginForm.value).subscribe({
      next: (res) => {
        // console.log(res);
        this.loginForm.reset();

        setTimeout(() => {
          if ('token' in res) {
            localStorage.setItem('userToken', res.token);
          }

          this._AuthService.shareUserData();
          this._Router.navigate(['/home']);
        }, 2000);

        this.isLoading = false;
      },
      error: (err) => {
        // console.log(err);
        this.isLoading = false;
        this.errMsg = err.error.msg;
      },
    });
  }
}
