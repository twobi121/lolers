import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {constants} from '../shared/constants/constants';
import { Observable, Subject } from 'rxjs';
import {map} from 'rxjs/operators';
import {Message} from '../interfaces/message';

@Injectable()
export class ChatService {
  private socket;
  url = constants.url

  constructor() {}

  setConnection(id: string) {
    this.socket = io(this.url);
    this.socket.emit('join', id);
  }

  sendMessage(message: Message) {
    this.socket.emit('message', message);
  }

  getMessages(): Observable<Message> {
    return new Observable((observer) => {
      this.socket.on('new-message', (message) => {
        observer.next(message);
      });
    });
  }


}
