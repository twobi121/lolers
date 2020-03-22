import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {HttpClient, HttpEvent, HttpResponse} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {constants} from '../../shared/constants/constants';
import {Dialogue} from '../../interfaces/dialogue';
import {Message} from '../../interfaces/message';

@Injectable()
export class Service {
  dialoguesUrl = constants.dialoguesUrl;

  constructor(
      private http: HttpClient,
    ) { }

  getDialogues(): Observable<Dialogue[]> {
    return this.http.get<any>(this.dialoguesUrl)
      .pipe(
        map(dialogues => dialogues)
      );
  }

  getMessages(id: string): Observable<Message[]> {
    return this.http.get<Message[]>(this.dialoguesUrl + id)
      .pipe(
        map(messages => messages)
      );
  }



}
