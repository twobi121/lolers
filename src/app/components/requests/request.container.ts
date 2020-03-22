import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {Request} from '../../interfaces/request';
import {State} from '../../store/states/app.state';
import {Store} from '@ngrx/store';
import {AcceptRequestAction, DeclineRequestAction, GetRequestsAction} from '../../store/users/actions';
import {selectRequests} from '../../store/users/selectors';

@Component({
  selector: 'app-requests-container',
  template: '<app-requests [requests]="requests$ | async" (closeEmitter)="close($event)" (acceptEmitter)="accept($event)" (declineEmitter)="decline($event)"></app-requests>',
  styleUrls: ['./requests.component.scss']
})
export class RequestsContainer implements OnInit {
  requests$: Observable<Request[]> = this.store.select(selectRequests);

  constructor(
    private store: Store<State>,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getRequests();

  }

  getRequests() {
    this.store.dispatch(new GetRequestsAction());
  }

  close($event: any) {
    const target = $event.target.className;
    if (target === 'fas fa-times close_btn' || target === 'upload_modal_overlay' ) {
      this.router.navigateByUrl(this.router.url.replace('requests',  '/'));
    }
    $event.stopPropagation();
  }

  accept(id: number) {
    this.store.dispatch(new AcceptRequestAction(id));
  }

  decline(id: number) {
    this.store.dispatch(new DeclineRequestAction(id));
  }
}

