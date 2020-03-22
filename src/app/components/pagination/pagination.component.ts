import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {User} from '../../interfaces/user';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() dataItems: User[];
  @Input() listNumber: number;
  @Input() currentPage: number;
  @Output() changePageEmitter: EventEmitter<number> = new EventEmitter<number>();
  totalItems: number;
  totalPages: number;
  startPage: number;
  endPage: number;
  pages: number[];
  constructor() { }

  ngOnInit() {
    this.setPagination();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.listNumber && !changes.listNumber.firstChange && changes.listNumber.currentValue !== changes.listNumber.previousValue) {
      const skipped = (this.currentPage - 1) * changes.listNumber.previousValue;
      this.changePage(Math.floor(skipped / this.listNumber) + 1);
    }

    if (changes.dataItems && changes.dataItems.currentValue[0].totalCount !== this.totalItems) {
      this.totalItems = changes.dataItems.currentValue[0].totalCount;
      this.setPagination();
    }
  }

  setPagination() {
    this.totalItems = this.dataItems[0].totalCount;
    this.totalPages = Math.ceil(this.totalItems / this.listNumber);

    if (this.totalPages <= 5) {
      this.startPage = 1;
      this.endPage = this.totalPages;
    } else {
      if (this.currentPage <= 3) {
        this.startPage = 1;
        this.endPage = 5;
      } else if (this.currentPage + 1 >= this.totalPages) {
        this.startPage = this.totalPages - 4;
        this.endPage = this.totalPages;
      } else {
        this.startPage = this.currentPage - 2;
        this.endPage = this.currentPage + 2;
      }
    }

    this.pages = [];

    for (let i = this.startPage; i <= this.endPage; i++) {
      this.pages.push(i);
    }
  }

  changePage(page: number) {
    this.currentPage = page;
    this.setPagination();
    this.changePageEmitter.emit(page);
  }

}
