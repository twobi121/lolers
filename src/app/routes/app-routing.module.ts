import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersContainer} from '../pages/users/users.container';
import {UserEditContainer} from '../pages/user-edit/user-edit.container';
import {LoginContainer} from '../pages/login/login.container';
import {AuthGuard} from '../guards/auth.guard';
import {LoginGuard} from '../guards/login.guard';
import {UserPageContainer} from '../pages/user-page/user-page.container';
import {MainPageGuard} from '../guards/main-page.guard';
import {AlbumsContainer} from '../pages/albums/albums.container';
import {AlbumContainer} from '../pages/album/album.container';
import {UploadContainer} from '../pages/upload/upload.container';
import {CreatealbumComponent} from '../components/createalbum/createalbum.component';
import {FriendsContainer} from '../pages/friends/friends.container';
import {RequestsContainer} from '../components/requests/request.container';
import {PhotoContainer} from '../components/photo/photo.container';
import {DashboardContainer} from '../pages/dashboard/dashboard.container';
import {RegistrationContainer} from '../pages/registration/registration.container';
import {DialoguesContainer} from '../pages/dialogues/dialogues.container';



const routes: Routes = [
  { path: '', component: LoginContainer, canActivate: [MainPageGuard]},
  { path: 'user/:login/dialogues', component: DialoguesContainer},
  { path: 'user/:login/albums/upload', component: UploadContainer, canActivate: [AuthGuard]},
  { path: 'user/:login/albums', component: AlbumsContainer, canActivate: [AuthGuard], children: [
      { path: 'create', component: CreatealbumComponent, canActivate: [AuthGuard]},
      { path: ':photo', component: PhotoContainer, canActivate: [AuthGuard]}
    ]},
  { path: 'user/:login/album/:album_id', component: AlbumContainer, canActivate: [AuthGuard], children: [
      { path: ':photo', component: PhotoContainer, canActivate: [AuthGuard]}
    ]},
  { path: 'user/:login/friends', component: FriendsContainer
    },
  { path: 'user/:login', component: UserPageContainer, children: [
      { path: 'requests', component: RequestsContainer, canActivate: [AuthGuard]}
    ]},
  { path: 'edit/:login', component: UserEditContainer, canActivate: [AuthGuard] },
  { path: 'users', component: UsersContainer, canActivate: [AuthGuard]  },
  { path: 'dashboard', component: DashboardContainer},
  { path: 'registration', component: RegistrationContainer, canActivate: [LoginGuard]},
  { path: 'login', component: LoginContainer, canActivate: [LoginGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})

export class AppRoutingModule { }



