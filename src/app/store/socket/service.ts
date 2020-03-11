import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {constants} from '../../shared/constants/constants';
import {Message} from '../../interfaces/message';
import {Observable} from 'rxjs';

@Injectable()
export class Service {
  private socket;
  url = constants.url

  constructor() { }

  setConnection() {
    this.socket = io(this.url);
  }

  joinRoom(id: string) {
    this.socket.emit('join', id);
  }

  leaveRoom() {
    if (this.socket) {
      this.socket.emit('leaveRoom');
    }
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

  getNotifications(): Observable<string> {
    return new Observable((observer) => {
      this.socket.on('not', (message) => {
        observer.next(message);
      });
    });
  }

}
