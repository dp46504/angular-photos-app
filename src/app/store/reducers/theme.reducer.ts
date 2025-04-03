import { createReducer, on } from '@ngrx/store';
import { switchMode } from '../actions/theme.actions';

export const initialState = true;

export const themeReducer = createReducer(
  initialState,
  on(switchMode, (state) => {
    console.log('Switching mode');
    return !state;
  })
);
