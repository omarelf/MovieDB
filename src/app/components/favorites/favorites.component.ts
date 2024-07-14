import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../core/storage/storage.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favorites: any[] = [];

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.loadFavorites(); 
  }

  loadFavorites() {
    this.favorites = this.storageService.load('favorites') || [];
  }

  removeFromFavorites(movieId: number) {
    this.favorites = this.favorites.filter((movie: any) => movie.id !== movieId);
    this.storageService.save('favorites', this.favorites);
    this.loadFavorites();
  }
}
