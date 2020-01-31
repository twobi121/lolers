import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './routes/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroRegistrationComponent } from './hero-registration/hero-registration.component';
import {HttpClientModule} from '@angular/common/http';
import {HeroDetailContainerComponent} from './hero-detail/hero-detail.container.component';
import { HeroFormComponentComponent } from './hero-form/hero-form-component.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroRegistrationComponent,
    HeroDetailContainerComponent,
    HeroFormComponentComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
