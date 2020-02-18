import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {SafeUrl} from '@angular/platform-browser';

@Injectable()
export class DataService {

  private registredState = new BehaviorSubject<boolean>(false);
  registredState$ = this.registredState.asObservable();

  private isAuth = new BehaviorSubject<boolean>(true);
  isAuth$ = this.isAuth.asObservable();

  private authErr = new BehaviorSubject<string>('');
  authErr$ = this.authErr.asObservable();

  private login = new BehaviorSubject<string>('' || localStorage.getItem('login'));
  login$ = this.login.asObservable();
  photos: any[];
  albums: any[];
  photo: string;
  selectedFiles: [];
  blobs: SafeUrl[];

  constructor() {

  }

  setLogin(login: string) {
    this.login.next(login);
  }

  changeRegState(state: boolean) {
    this.registredState.next(state);
  }

  changeAuthState(state: boolean) {
    this.isAuth.next(state);
  }

  setAuthError(error: string) {
    this.authErr.next(error);
  }
}



