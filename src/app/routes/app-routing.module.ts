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
import {PhotoComponent} from '../components/photo/photo.component';



const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [MainPageGuard]},
  { path: 'hero/:login/albums/:id', component: AlbumsContainer, canActivate: [AuthGuard], children: [
      { path: ':photo', component: PhotoComponent, canActivate: [AuthGuard]}
    ]},
  { path: 'hero/:login', component: UserPageContainer, canActivate: [AuthGuard] },
  { path: 'edit/:login', component: UserEditContainer, canActivate: [AuthGuard] },
  { path: 'heroes', component: HeroesComponent, canActivate: [AuthGuard]  },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'registration', component: RegistrationComponent, canActivate: [LoginGuard]},
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})

export class AppRoutingModule { }



