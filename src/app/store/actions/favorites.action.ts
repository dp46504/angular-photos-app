import { createAction, props } from '@ngrx/store';

export const addToFavorites = createAction(
  '[Favorites] Add to favorites',
  props<{ photoId: number }>()
);
export const removeFromFavorites = createAction(
  '[Favorites] Remove from favorites',
  props<{ photoId: number }>()
);
