import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Observable, Subscription} from 'rxjs';
import {DataService} from '../../services/data-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  requests$: Observable<[]>;
  requests: [] = [];
  url = 'http://localhost:8000/';
  subs: Subscription[] = [];
  acceptStatus: boolean[] = [];

  constructor(
    private heroService: UserService,
    private dataService: DataService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getRequests();
  }

  getRequests() {
    this.requests$ = this.heroService.getRequests();
    this.subs.push(this.requests$.subscribe(
      requests => this.requests = requests
    ));
  }

  close(event: any ) {
    const target = event.target.className;
    if (target === 'fas fa-times close_btn' || target === 'upload_modal_overlay' ) {
      this.router.navigateByUrl(this.router.url.replace('requests',  '/'));
    }
    event.stopPropagation();
  }

  accept(id: string) {
    const accept = this.heroService.acceptRequest(id);
    this.subs.push(accept.subscribe(
    response => {
      if (response.status === 200) {
        this.acceptStatus.push(true);
      }
    }));
  }

  decline(id: string) {
    // @ts-ignore
    const decline = this.heroService.declineRequest(id);
    this.subs.push(decline.subscribe(
      response => {
        if (response.status === 200) {
          this.acceptStatus.push(false);
        }
      }));
    }
}

