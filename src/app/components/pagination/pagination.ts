import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css'
})
export class Pagination {

  @Input() totalItems = 0;
  @Input() itemsPerPage = 5;
  @Input() currentPage = 1;

  @Output() currentPageChange = new EventEmitter<number>();

  get totalPages() {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPageChange.emit(this.currentPage + 1);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPageChange.emit(this.currentPage - 1);
    }
  }
}