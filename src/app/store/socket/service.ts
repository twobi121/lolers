import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {constants} from '../../shared/constants/constants';
import {Message} from '../../interfaces/message';
import {Observable, throwError} from 'rxjs';

@Injectable()
export class Service {
  private socket;
  url = constants.url;

  constructor() { }

  setConnection(id: number) {
    this.socket = io(this.url,  { query: {id},
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax : 5000,
      reconnectionAttempts: 99999 } );

    this.socket.on('connect_error', err => this.errorHandle(err));
  }

  getStartMessages(): Observable<Message[]> {
    return new Observable((observer) => {
      this.socket.on('get-messages', (messages) => {
        observer.next(messages);
      });
    });
  }

  joinRoom(id: string) {
    this.socket.emit('join', id);
  }

  setRead(id: number) {
    setTimeout(() => this.socket.emit('read', id), 3000);
  }

  leaveRoom() {
    if (this.socket) {
      this.socket.emit('leaveRoom');
    }
  }

  sendMessage(message: Message) {
    this.socket.emit('message', message);
    this.socket.on('error', err => console.log(err));
  }

  getMessages(): Observable<Message> {
    return new Observable((observer) => {
      this.socket.on('new-message', (message) => {
        if (message[0].owner_id !== this.socket.id) {
          console.log('read');
          this.setRead(message[0].owner_id);
        }
        observer.next(message);
      });
    });
  }

  getPreviousMessages(skipValue: number) {
    console.log(skipValue);
    this.socket.emit('get-prev-messages', skipValue);
    return new Observable((observer) => {
      this.socket.on('get-prev-messages', (messages) => {
        observer.next(messages);
      });
    });
  }

  getNotifications(): Observable<string | number> {
    return new Observable((observer) => {
      this.socket.on('not', (message) => {
        observer.next(message);
      });
    });
  }

  errorHandle(err) {
    console.log(err);
  }

}
