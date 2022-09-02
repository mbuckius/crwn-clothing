import { SEARCH_ACTION_TYPES } from './search.types';
import { createAction } from '../../utils/reducer/reducer.utils';

export const setIsSearchOpen = (boolean) =>
  createAction(SEARCH_ACTION_TYPES.SET_IS_SEARCH_OPEN, boolean);