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

  getDialogueId(id: number) {
    return this.http.get<number>(this.dialoguesUrl + 'getDialogueId/' + id)
      .pipe(
        map((dialogueId: number) => dialogueId)
      );
  }

  startDialogue(id: number | number[]): Observable<number> {
    return this.http.post<number>(this.dialoguesUrl + 'create', {id})
      .pipe(
        map((dialogueId: number) => dialogueId)
      );
  }

  getMessages(id: string): Observable<Message[]> {
    return this.http.get<Message[]>(this.dialoguesUrl + id)
      .pipe(
        map(messages => messages)
      );
  }


}
