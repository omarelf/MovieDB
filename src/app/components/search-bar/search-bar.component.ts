import { Component } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { loadMovies } from '../../store/movie.actions';
import { Actions } from '@ngrx/effects';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  query: string = '';

  constructor(private store: Store) {}

  onSearch() {
    this.store.dispatch(loadMovies({ query: this.query }));
  }
}
