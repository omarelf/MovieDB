import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TmdbService } from '../core/http/tmdb.service';

@Injectable({
  providedIn: 'root'
})
export class MovieResolver implements Resolve<any> {
  constructor(
    private tmdbService: TmdbService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const movieId = route.paramMap.get('id');
    if (movieId) {
      return this.tmdbService.getMovieDetails(Number(movieId)).pipe(
        catchError(error => {
          console.error('Error fetching movie details:', error);
          this.router.navigate(['/movies']); // Redirect to movie list on error
          return of(null); // Return a null observable
        })
      );
    } else {
      this.router.navigate(['/movies']); // Redirect to movie list if movieId is invalid
      return of(null); // Return a null observable
    }
  }
}
