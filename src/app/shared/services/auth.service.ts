import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environments } from '../../base/environments';
import { SuccessRegister } from '../interfaces/success-register';
import { FailRegister } from '../interfaces/fail-register';
import { SuccessLogin } from '../interfaces/success-login';
import { FailLogin } from '../interfaces/fail-login';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // global property
  userDataDecoded: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    private _HttpClient: HttpClient,
    @Inject(PLATFORM_ID) id: object,
    _Router: Router
  ) {
    if (isPlatformBrowser(id)) {
      if (localStorage.getItem('userToken')) {
        this.shareUserData();
        _Router.navigate([localStorage.getItem('currentPage')]);
      }
    }
  }

  registerForm(data: object): Observable<SuccessRegister | FailRegister> {
    return this._HttpClient.post<SuccessRegister | FailRegister>(
      `${environments.baseUrl}/api/v1/users/signUp`,
      data
    );
  }

  loginForm(data: object): Observable<SuccessLogin | FailLogin> {
    return this._HttpClient.post<SuccessLogin | FailLogin>(
      `${environments.baseUrl}/api/v1/users/signIn`,
      data
    );
  }

  shareUserData(): void {
    const token = JSON.stringify(localStorage.getItem('userToken'));
    const decoded = jwtDecode(token);
    this.userDataDecoded.next(decoded);
    // console.log(this.userDataDecoded.getValue());
  }
}
