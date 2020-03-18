import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {HttpClient, HttpEvent, HttpResponse} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {constants} from '../../shared/constants/constants';
import {Dialogue} from '../../interfaces/dialogue';
import {Message} from '../../interfaces/message';
import {User} from '../../interfaces/user';

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

  getDialogueId(id: number): Observable<Dialogue> {
    return this.http.get<Dialogue>(this.dialoguesUrl + 'getDialogueId/' + id)
      .pipe(
        map((dialogue: Dialogue) => dialogue)
      );
  }

  startDialogue(id: number | number[]): Observable<Dialogue> {
    return this.http.post<Dialogue>(this.dialoguesUrl + 'create', {id})
      .pipe(
        map((dialogue: Dialogue) => dialogue)
      );
  }

  getMessages(id: string): Observable<Message[]> {
    return this.http.get<Message[]>(this.dialoguesUrl + id)
      .pipe(
        map(messages => messages)
      );
  }


}
