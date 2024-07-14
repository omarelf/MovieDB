import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from '../../core/http/tmdb.service';
import { StorageService } from '../../core/storage/storage.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movie: any;
  isLiked: boolean = false;
  isFavorite: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private tmdbService: TmdbService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data:any) => {
      if (data.movie) {
        this.movie = data.movie;
        this.checkIfLiked();
      } else {
        console.error('Movie data not available');
      }
    });
  }

  checkIfLiked() {
    const likedMovies = this.storageService.load('likedMovies') || [];
    this.isLiked = likedMovies.includes(this.movie.id);
  }

  toggleLike() {
    let likedMovies = this.storageService.load('likedMovies') || [];
    if (this.isLiked) {
      likedMovies = likedMovies.filter((id: number) => id !== this.movie.id);
    } else {
      likedMovies.push(this.movie.id);
    }
    this.storageService.save('likedMovies', likedMovies);
    this.isLiked = !this.isLiked;
  }

  addToFavorites() {
    let favorites = this.storageService.load('favorites') || [];
    if (!favorites.find((fav: any) => fav.id === this.movie.id)) {
      favorites.push(this.movie);
      this.storageService.save('favorites', favorites);
    }
  }
  toggleFavorite() {
    let favorites = this.storageService.load('favorites') || [];
    if (this.isFavorite) {
      favorites = favorites.filter((fav: any) => fav.id !== this.movie.id);
    } else {
      favorites.push(this.movie);
    }
    this.storageService.save('favorites', favorites);
    this.isFavorite = !this.isFavorite;
  }
}
