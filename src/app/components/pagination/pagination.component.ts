import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../interfaces/user';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() dataItems: User[];
  @Input() listNumber: number;
  @Output() emutter: EventEmitter<void> = new EventEmitter();
  totalPages: number;
  constructor() { }

  ngOnInit() {
    this.totalPages = Math.ceil(this.dataItems[0].totalCount / this.listNumber);

  }

  emitter() {
    this.emutter.emit();
  }

}
