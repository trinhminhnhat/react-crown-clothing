import { createAction } from 'utils/reducer';
import { CATEGORIES_ACTION_TYPES } from './categories.type';

export const setCategories = (categories) => createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categories);
