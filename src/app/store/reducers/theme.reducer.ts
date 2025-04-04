import { createReducer, on } from '@ngrx/store';
import { switchMode } from '../actions/theme.actions';

export const initialState =
  localStorage.getItem('darkMode') === 'true' ? true : false;

export const themeReducer = createReducer(
  initialState,
  on(switchMode, (state) => {
    console.log('Switching mode');
    localStorage.setItem('darkMode', (!state).toString());
    return !state;
  })
);
