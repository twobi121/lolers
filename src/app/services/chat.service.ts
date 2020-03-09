import { Injectable } from '@angular/core';
import { WebsocketService } from './websockets.service';
import { Observable, Subject } from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class ChatService {

  messages: Subject<any>;

  // Our constructor calls our wsService connect method
  constructor(private wsService: WebsocketService) {
    // this.messages = this.wsService.connect()
    // map((response: any): any => {
    //     return response;
    //   });
  }

  // Our simplified interface for sending
  // messages back to our socket.io server
  sendMsg(msg) {
    this.messages.next(msg);
  }

}
