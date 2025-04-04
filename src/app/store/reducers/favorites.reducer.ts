import { createReducer, on } from '@ngrx/store';
import {
  addToFavorites,
  removeFromFavorites,
} from '../actions/favorites.action';

export interface FavoritesState {
  photoIds: number[];
}

export const initialState: FavoritesState = {
  photoIds: JSON.parse(localStorage.getItem('favorites') || '[]'),
};

export const favoritesReducer = createReducer(
  initialState,
  on(addToFavorites, (state, { photoId }) => {
    localStorage.setItem(
      'favorites',
      JSON.stringify([
        ...state.photoIds.filter((id) => id !== photoId),
        photoId,
      ])
    );
    return {
      ...state,
      photoIds: [...state.photoIds.filter((id) => id !== photoId), photoId],
    };
  }),
  on(removeFromFavorites, (state, { photoId }) => {
    localStorage.setItem(
      'favorites',
      JSON.stringify(state.photoIds.filter((id) => id !== photoId))
    );
    return {
      ...state,
      photoIds: state.photoIds.filter((id) => id !== photoId),
    };
  })
);
