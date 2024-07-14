import { createAction, props } from '@ngrx/store';

export const loadMovies = createAction('[Movie List] Load Movies', props<{ query: string }>());
export const loadMoviesSuccess = createAction('[Movie List] Load Movies Success', props<{ movies: any[] }>());
export const loadMoviesFailure = createAction('[Movie List] Load Movies Failure', props<{ error: any }>());
