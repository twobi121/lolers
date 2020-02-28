import { BrowserModule } from '@angular/platform-browser';
import {NgModule, Provider} from '@angular/core';
import { AppComponent } from './app.component';
import { HeroesComponent } from './pages/heroes/heroes.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import {UserEditContainer} from './pages/user-edit/user-edit.container';
import { AppRoutingModule } from './routes/app-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {RegistrationComponent} from './pages/registration/registration.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { HeroFormComponentComponent } from './pages/hero-form/hero-form-component.component';
import { LoginComponent } from './pages/login/login.component';
import {DataService} from './services/data-service';
import {AuthGuard} from './guards/auth.guard';
import { CheckAuthComponent } from './check-auth/check-auth.component';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import {LoginGuard} from './guards/login.guard';
import { MenuComponent } from './pages/menu/menu.component';
import {MenuContainer} from './pages/menu/menu.container';
import { UserPageComponent } from './pages/user-page/user-page.component';
import {UserPageContainer} from './pages/user-page/user-page.container';
import {MainPageGuard} from './guards/main-page.guard';
import { AvatarComponent } from './components/avatar/avatar.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { LastPhotosComponent } from './components/last-photos/last-photos.component';
import {LastPhotosContainer} from './components/last-photos/last-photos.container';
import { AlbumsComponent } from './pages/albums/albums.component';
import {AlbumsContainer} from './pages/albums/albums.container';
import { PhotoComponent } from './components/photo/photo.component';
import { AlbumComponent } from './pages/album/album.component';
import {AlbumContainer} from './pages/album/album.container';
import { UploadComponent } from './pages/upload/upload.component';
import { CreatealbumComponent } from './components/createalbum/createalbum.component';
import { RequestsComponent } from './components/requests/requests.component';
import { FriendsComponent } from './pages/friends/friends.component';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store';
import {Effects} from './store/users/effects';
import {UserModule} from './store/users/module';
import {MediaModule} from './store/media/module';
import {RequestsContainer} from './components/requests/request.container';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
}

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    UserEditComponent,
    UserEditContainer,
    DashboardComponent,
    HeroFormComponentComponent,
    LoginComponent,
    RegistrationComponent,
    CheckAuthComponent,
    MenuComponent,
    MenuContainer,
    UserPageComponent,
    UserPageContainer,
    AvatarComponent,
    UserInfoComponent,
    LastPhotosComponent,
    LastPhotosContainer,
    AlbumsComponent,
    AlbumsContainer,
    PhotoComponent,
    AlbumComponent,
    AlbumContainer,
    UploadComponent,
    CreatealbumComponent,
    RequestsComponent,
    RequestsContainer,
    FriendsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    UserModule,
    MediaModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [DataService, AuthGuard, LoginGuard, MainPageGuard, INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule { }
