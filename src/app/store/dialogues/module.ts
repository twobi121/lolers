import {EffectsModule} from '@ngrx/effects';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {Service} from './service';
import {Effects} from './effects';

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([Effects])],
  providers: [Service]
})

export class DialoguesModule {
}
