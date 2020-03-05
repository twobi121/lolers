import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {User} from '../../interfaces/user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent {
  @Input() regState: boolean;
  @Output() addUserEmitter: EventEmitter<User> = new EventEmitter<User>();

  addUser(myForm: NgForm): void {
    const user: User = myForm.form.value;
    this.addUserEmitter.emit(user);
  }
}
