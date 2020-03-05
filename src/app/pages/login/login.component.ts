import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  @Input() loginForm: FormGroup;
  @Input() loginError: string;
  @Output() submitEmitter: EventEmitter<void> = new EventEmitter<void>();

  submit() {
    this.submitEmitter.emit();
  }
}
