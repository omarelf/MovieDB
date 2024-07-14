import { createReducer, on, Action } from '@ngrx/store';
import { loadMoviesSuccess, loadMoviesFailure } from './movie.actions';

export interface MovieState {
  movies: any[];
  error: any;
}

export const initialState: MovieState = {
  movies: [],
  error: null
};

const movieReducerInternal = createReducer(
  initialState,
  on(loadMoviesSuccess, (state, { movies }) => ({ ...state, movies })),
  on(loadMoviesFailure, (state, { error }) => ({ ...state, error }))
);

export function movieReducer(state: MovieState | undefined, action: Action) {
  return movieReducerInternal(state, action);
}
