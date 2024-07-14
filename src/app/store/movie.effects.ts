import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { TmdbService } from '../core/http/tmdb.service';
import { loadMovies, loadMoviesSuccess, loadMoviesFailure } from './movie.actions';

@Injectable()
export class MovieEffects {
  constructor(
    private actions$: Actions,
    private tmdbService: TmdbService
  ) {}

  loadMovies$ = createEffect((actions$ = inject(Actions)) => 
    actions$.pipe(
      ofType(loadMovies),
      mergeMap(action =>
        this.tmdbService.searchMovies(action.query).pipe(
          map(movies => loadMoviesSuccess({ movies: movies.results })),
          catchError(error => of(loadMoviesFailure({ error })))
        )
      )
    )
  )
}
