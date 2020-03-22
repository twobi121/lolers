import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {User} from '../../interfaces/user';
import {constants} from '../../shared/constants/constants';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit{
  @Input() users: User[];
  @Input() listNumber: number;
  @Input() currentPage: number;
  @Input() sortValue: string;
  @Input() searchValue: string;
  @Output() setSortEmitter: EventEmitter<string> = new EventEmitter<string>();
  @Output() searchEmitter: EventEmitter<string> = new EventEmitter<string>();
  @Output() setListNumberEmitter: EventEmitter<number> = new EventEmitter<number>();
  @Output() changePageEmitter: EventEmitter<number> = new EventEmitter<number>();
  url = constants.url;
  timer: number;
  listForm: FormGroup;
  sortForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.listForm = this.fb.group({
      listControl: [this.listNumber]
    });
    this.sortForm = this.fb.group({
      sortControl: [this.sortValue]
    });
  }

  search(event: Event) {
    // @ts-ignore
    const value = event.target.value;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.searchEmitter.emit(value), 1000);
  }

  setListNumber(value: string) {
    this.listNumber = +value;
    this.setListNumberEmitter.emit(+value);
  }

  setSort(value: string) {
    this.setSortEmitter.emit(value);
  }

  changePage(page: number) {
    this.changePageEmitter.emit(page);
  }
}
