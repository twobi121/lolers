import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, Subject } from 'rxjs';
import {constants} from '../shared/constants/constants';

@Injectable()
export class WebsocketService {

  // Our socket connection
  private socket;
  url = constants.url
  constructor() { }



}
