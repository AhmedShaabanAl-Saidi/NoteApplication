import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../../base/environments';
import { SuccessAddNote } from '../interfaces/success-add-note';
import { FailAddNote } from '../interfaces/fail-add-note';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor(private _HttpClient: HttpClient) {}

  addNote(data: object): Observable<SuccessAddNote | FailAddNote> {
    return this._HttpClient.post<SuccessAddNote | FailAddNote>(
      `${environments.baseUrl}/api/v1/notes`,
      data,
      {
        headers: { token: '3b8ny__' + localStorage.getItem('userToken') },
      }
    );
  }

  getNotes(): Observable<any> {
    return this._HttpClient.get(`${environments.baseUrl}/api/v1/notes`, {
      headers: { token: '3b8ny__' + localStorage.getItem('userToken') },
    });
  }
}
