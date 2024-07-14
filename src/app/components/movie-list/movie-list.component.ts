import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadMovies } from '../../store/movie.actions';
import { selectAllMovies } from '../../store/movie.selectors';
import { StorageService } from '../../core/storage/storage.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  movies$: Observable<any[]>;
  filteredMovies: any[] = [];
  movies: any[] = [];
  likedMovies: number[] = [];

  constructor(private store: Store, private storageService: StorageService) {
    this.movies$ = this.store.pipe(select(selectAllMovies));
  }

  ngOnInit(): void {
    this.store.dispatch(loadMovies({ query: 'latest' }));
    this.movies$.subscribe((movies: any[]) => {
      this.movies = movies;
      this.filteredMovies = movies;
      this.likedMovies = this.storageService.load('likedMovies') || [];
    });
  }

  onFilter(event: { category: string; year: number }) {
    this.filteredMovies = this.movies.filter(movie => {
      const matchesCategory = event.category ? movie.genre_ids.includes(this.getCategoryId(event.category)) : true;
      const matchesYear = event.year ? new Date(movie.release_date).getFullYear() === event.year : true;
      return matchesCategory && matchesYear;
    });
  }

  getCategoryId(category: string): number {
    const categories: { [key: string]: number } = {
      action: 28,
      comedy: 35,
      drama: 18
    };
    return categories[category];
  }

  viewFavorites() {
    const favoriteMovies = this.storageService.load('favorites') || [];
    this.filteredMovies = favoriteMovies;
  }

  toggleLike(movie: any) {
    const index = this.likedMovies.indexOf(movie.id);
    if (index > -1) {
      this.likedMovies.splice(index, 1);
    } else {
      this.likedMovies.push(movie.id);
    }
    this.storageService.save('likedMovies', this.likedMovies);
  }

  isLiked(movie: any): boolean {
    return this.likedMovies.includes(movie.id);
  }
}
