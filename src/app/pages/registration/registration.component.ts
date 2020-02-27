import {Component, OnDestroy} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {User} from '../../interfaces/user';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnDestroy {
  subs: Subscription[] = [];
  regState = false;

  constructor(private userService: UserService,
              ) { }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  addUser(myForm: NgForm): void {
    const user: User = myForm.form.value;
    const registration$ = this.userService.addHero(user);
    this.subs.push(registration$.subscribe(response => {
      this.regState = response.status === 201;
    }));
  }
}
