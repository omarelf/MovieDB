import { createSelector, createFeatureSelector } from '@ngrx/store';
import { MovieState } from './movie.reducer';

export const selectMovieState = createFeatureSelector<MovieState>('movies');

export const selectAllMovies = createSelector(
  selectMovieState,
  (state: MovieState) => state.movies
);
