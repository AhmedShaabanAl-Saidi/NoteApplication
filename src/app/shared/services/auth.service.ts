import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../../base/environments';
import { SuccessRegister } from '../interfaces/success-register';
import { FailRegister } from '../interfaces/fail-register';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient) {}

  registerForm(data: object): Observable<SuccessRegister | FailRegister> {
    return this._HttpClient.post<SuccessRegister | FailRegister>(
      `${environments.baseUrl}/api/v1/users/signUp`,
      data
    );
  }
}
