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
  IsFriendFailureAction,
  SendRequestAction,
  SendRequestSuccessAction,
  UploadAvatarAction,
  UploadAvatarFailureAction,
  UploadAvatarSuccessAction,
  GetRequestsAction,
  SendRequestFailureAction,
  GetRequestsSuccessAction,
  AcceptRequestAction,
  AcceptRequestFailureAction,
  AcceptRequestSuccessAction,
  DeclineRequestSuccessAction,
  DeclineRequestAction,
  DeclineRequestFailureAction,
  GetRequestsFailureAction,
  GetFriendsAction,
  GetFriendsSuccessAction,
  GetFriendsFailureAction,
  DeleteFriendAction,
  DeleteFriendFailureAction,
  DeleteFriendSuccessAction,
  LoginAction,
  LoginSuccessAction,
  LoginFailureAction, AddUserAction, AddUserSuccessAction, AddUserFailureAction, SearchAction, SearchSuccesAction, SearchFailureAction
} from './actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {User} from '../../interfaces/user';
import {Observable, of} from 'rxjs';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Data, Router} from '@angular/router';
import {IsFriend} from '../../interfaces/isFriend';
import {Request} from '../../interfaces/request';
import {Friend} from '../../interfaces/friend';
import {Store} from '@ngrx/store';
import {State} from '../states/app.state';


@Injectable()
export class Effects {
  constructor(
    private actions$: Actions,
    private service: Service,
    private router: Router,
    private store: Store<State>
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
    catchError((err) => of(new SendRequestFailureAction()))
  );

  @Effect()
  getRequest$ = this.actions$.pipe(
    ofType<GetRequestsAction>(ActionTypes.GET_REQUESTS),
    switchMap(() => this.service.getRequests()),
    map((requests: Request[]) => new GetRequestsSuccessAction(requests)),
    catchError((err) => of(new GetRequestsFailureAction()))
  );

  @Effect()
  acceptRequest$ = this.actions$.pipe(
    ofType<AcceptRequestAction>(ActionTypes.ACCEPT_REQUEST),
    switchMap((action: AcceptRequestAction) => this.service.acceptRequest(action.payload)),
    map((id: string) => new AcceptRequestSuccessAction(id)),
    catchError((err) => of(new AcceptRequestFailureAction()))
  );

  @Effect()
  declineRequest$ = this.actions$.pipe(
    ofType<DeclineRequestAction>(ActionTypes.DECLINE_REQUEST),
    switchMap((action: DeclineRequestAction) => this.service.declineRequest(action.payload)),
    map((id: string) => new DeclineRequestSuccessAction(id)),
    catchError((err) => of(new DeclineRequestFailureAction()))
  );

  @Effect()
  uploadAvatar$ = this.actions$.pipe(
    ofType<UploadAvatarAction>(ActionTypes.UPLOAD_AVATAR),
    switchMap((action: UploadAvatarAction) => this.service.uploadAvatar(action.payload)),
    map((response: HttpResponse<object>) => new UploadAvatarSuccessAction(response.body)),
    catchError((err) => of(new UploadAvatarFailureAction()))
  );

  @Effect()
  getFriends$ = this.actions$.pipe(
    ofType<GetFriendsAction>(ActionTypes.GET_FRIENDS),
    switchMap((action: GetFriendsAction) => this.service.getFriends(action.payload)),
    map((friends: Friend[]) => new GetFriendsSuccessAction(friends)),
    catchError((err) => of(new GetFriendsFailureAction()))
  );

  @Effect()
  deleteFriend$ = this.actions$.pipe(
    ofType<DeleteFriendAction>(ActionTypes.DELETE_FRIEND),
    switchMap((action: DeleteFriendAction) => this.service.deleteFriend(action.payload)),
    map((id: number) => new DeleteFriendSuccessAction(id)),
    catchError((err) => of(new DeleteFriendFailureAction()))
  );


  @Effect()
  login$ = this.actions$.pipe(
    ofType<LoginAction>(ActionTypes.LOGIN),
    // @ts-ignore
    switchMap((action: LoginAction) => this.service.login(action.payload)),
    map((data: Data) => {
        if (data.token) {
          localStorage.setItem('authUserToken', data.token);
          this.router.navigateByUrl(`user/${data.user.login}`);
        }
        return new LoginSuccessAction(data.user);
    }),
    catchError((err: HttpErrorResponse) => of(new LoginFailureAction(err.error.error)))
  );

  @Effect()
  addUser$ = this.actions$.pipe(
    ofType<AddUserAction>(ActionTypes.ADD_USER),
    switchMap((action: AddUserAction) => this.service.addUser(action.payload)),
    map(() => new AddUserSuccessAction()),
    catchError((err: HttpErrorResponse) => of(new AddUserFailureAction(err.error.error)))
  );

  @Effect()
  search$ = this.actions$.pipe(
    ofType<SearchAction>(ActionTypes.SEARCH),
    switchMap((action: SearchAction) => this.service.searchUsers(action.payload)),
    map((users: User[]) => new SearchSuccesAction(users)),
    catchError((err: HttpErrorResponse) => of(new SearchFailureAction(err.error.error)))
  );


}
