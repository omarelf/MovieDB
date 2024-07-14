import { Component, Output, EventEmitter } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  @Output() filter = new EventEmitter<{ category: string, year: number }>();
  // @Output() viewFavoritesEvent = new EventEmitter<void>();
  
  constructor(private router:Router
  ) {}
  searchQuery: string = '';
  category: string = '';
  year: number  = 0;

  onFilter() {
    this.filter.emit({ category: this.category, year: this.year });
  }

  clearFilters() {
    this.category = '';
    this.year = 0;
    this.onFilter();
  }

  onSearch() {
    this.onFilter();
  }

  viewFavorites() {
    this.router.navigate(['/favorites']);
  }
}
