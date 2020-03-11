import {Injectable} from '@angular/core';
import {Service} from './service';
import {Effect, Actions, ofType} from '@ngrx/effects';
import {
  ActionTypes

} from './actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Dialogue} from '../../interfaces/dialogue';
import {Message} from '../../interfaces/message';

@Injectable()
export class Effects {
  constructor(
    private actions$: Actions,
    private service: Service,
  ) {
  }


}
