import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../../base/environments';
import { SuccessAddNote } from '../interfaces/success-add-note';
import { FailAddNote } from '../interfaces/fail-add-note';
import { SuccessGetNotes } from '../interfaces/success-get-notes';
import { SuccessUpdateNote } from '../interfaces/success-update-note';
import { FailUpdateNote } from '../interfaces/fail-update-note';
import { SuccessDeleteNote } from '../interfaces/success-delete-note';
import { FailDeleteNote } from '../interfaces/fail-delete-note';

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

  getNotes(): Observable<SuccessGetNotes | FailAddNote> {
    return this._HttpClient.get<SuccessGetNotes | FailAddNote>(
      `${environments.baseUrl}/api/v1/notes`,
      {
        headers: { token: '3b8ny__' + localStorage.getItem('userToken') },
      }
    );
  }

  updateUserNotes(
    id: string,
    data: object
  ): Observable<SuccessUpdateNote | FailUpdateNote> {
    return this._HttpClient.put<SuccessUpdateNote | FailUpdateNote>(
      `${environments.baseUrl}/api/v1/notes/${id}`,
      data,
      {
        headers: { token: '3b8ny__' + localStorage.getItem('userToken') },
      }
    );
  }

  deleteUserNotes(id: string): Observable<SuccessDeleteNote | FailDeleteNote> {
    return this._HttpClient.delete<SuccessDeleteNote | FailDeleteNote>(
      `${environments.baseUrl}/api/v1/notes/${id}`,
      {
        headers: { token: '3b8ny__' + localStorage.getItem('userToken') },
      }
    );
  }
}
