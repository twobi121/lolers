import {Injectable} from '@angular/core';
import {Service} from './service';
import {Effect, Actions, ofType} from '@ngrx/effects';
import {
  ActionTypes,
  GetUsersAction,
  GetUsersSuccessAction,
  GetUsersFailureAction,
  GetUserAction,
  GetUserSuccessAction,
  GetUserFailureAction,
  GetLoggedUserAction,
  GetLoggedUserSuccessAction,
  GetLoggedUserFailureAction,
  LogoutAction,
  LogoutFailureAction,
  LogoutSuccessAction,
  IsFriendAction,
  IsFriendSuccessAction,
  IsFriendFailureAction, SendRequestAction, SendRequestSuccessAction
} from './actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {User} from '../../interfaces/user';
import {of} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {IsFriend} from '../../interfaces/isFriend';


@Injectable()
export class Effects {
  constructor(
    private actions$: Actions,
    private service: Service,
    private router: Router
  ) {
  }

  @Effect()
  getUsers$ = this.actions$.pipe(
    ofType<GetUsersAction>(ActionTypes.GET_USERS),
    switchMap(() => this.service.getUsers()),
    map((users: User[]) => new GetUsersSuccessAction(users)),
    catchError((err) => of(new GetUsersFailureAction()))
  );

  @Effect()
  getUser$ = this.actions$.pipe(
    ofType<GetUserAction>(ActionTypes.GET_USER),
    switchMap((action: GetUserAction) => this.service.getUser(action.payload)),
    map((user: User) => new GetUserSuccessAction(user)),
    catchError((err) => of(new GetUserFailureAction()))
  );

  @Effect()
  getLoggedUser$ = this.actions$.pipe(
    ofType<GetLoggedUserAction>(ActionTypes.GET_LOGGED_USER),
    switchMap(() => this.service.getLoggedUser()),
    map((user: User) => new GetLoggedUserSuccessAction(user)),
    catchError((err) => of(new GetLoggedUserFailureAction()))
  );

  @Effect()
  logout$ = this.actions$.pipe(
    ofType<LogoutAction>(ActionTypes.LOGOUT),
    switchMap(() => this.service.logout()),
    map((response: HttpResponse<object>) => {
      if (response.status === 200) {
        localStorage.removeItem('authUserToken');
        this.router.navigate([this.router.url + '/']);
        return new LogoutSuccessAction();
      }
    }),
    catchError((err) => of(new LogoutFailureAction()))
  );

  @Effect()
  isFriend$ = this.actions$.pipe(
    ofType<IsFriendAction>(ActionTypes.IS_FRIEND),
    switchMap((action: IsFriendAction) => this.service.getIsFriend(action.payload)),
    map((isFriend: IsFriend) => new IsFriendSuccessAction(isFriend)),
    catchError((err) => of(new IsFriendFailureAction()))
  );

  @Effect()
  sendRequest$ = this.actions$.pipe(
    ofType<SendRequestAction>(ActionTypes.SEND_REQUEST),
    switchMap((action: SendRequestAction) => this.service.sendRequest(action.payload)),
    map((response: HttpResponse<object>) => {
      if (response.status === 200) {
        return new SendRequestSuccessAction(true);
      }
    }),
    catchError((err) => of(new IsFriendFailureAction()))
  );

}
