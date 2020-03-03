import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HeroesComponent} from '../pages/heroes/heroes.component';
import {DashboardComponent} from '../pages/dashboard/dashboard.component';
import {UserEditContainer} from '../pages/user-edit/user-edit.container';
import {LoginComponent} from '../pages/login/login.component';
import {RegistrationComponent} from '../pages/registration/registration.component';
import {AuthGuard} from '../guards/auth.guard';
import {LoginGuard} from '../guards/login.guard';
import {UserPageContainer} from '../pages/user-page/user-page.container';
import {MainPageGuard} from '../guards/main-page.guard';
import {AlbumsContainer} from '../pages/albums/albums.container';
import {AlbumContainer} from '../pages/album/album.container';
import {UploadComponent} from '../pages/upload/upload.component';
import {CreatealbumComponent} from '../components/createalbum/createalbum.component';
import {FriendsComponent} from '../pages/friends/friends.component';
import {RequestsContainer} from '../components/requests/request.container';
import {PhotoContainer} from '../components/photo/photo.container';




const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [MainPageGuard]},
  { path: 'user/:login/albums/upload', component: UploadComponent, canActivate: [AuthGuard]},
  { path: 'user/:login/album/:album_id/upload', component: UploadComponent, canActivate: [AuthGuard]},
  { path: 'user/:login/albums', component: AlbumsContainer, canActivate: [AuthGuard], children: [
      { path: 'create', component: CreatealbumComponent, canActivate: [AuthGuard]},
      { path: ':photo', component: PhotoContainer, canActivate: [AuthGuard]}
    ]},
  { path: 'user/:login/album/:album_id', component: AlbumContainer, canActivate: [AuthGuard], children: [
      { path: ':photo', component: PhotoContainer, canActivate: [AuthGuard]}
    ]},
  { path: 'user/:login/friends', component: FriendsComponent
    },
  { path: 'user/:login', component: UserPageContainer, children: [
      { path: 'requests', component: RequestsContainer, canActivate: [AuthGuard]}
    ]},
  { path: 'edit/:login', component: UserEditContainer, canActivate: [AuthGuard] },
  { path: 'users', component: HeroesComponent, canActivate: [AuthGuard]  },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'registration', component: RegistrationComponent, canActivate: [LoginGuard]},
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})

export class AppRoutingModule { }



