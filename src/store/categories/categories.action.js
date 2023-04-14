import { createAction } from 'utils/reducer';
import { CATEGORIES_ACTION_TYPES } from './categories.type';

export const setCategoriesMap = (categoriesMap) =>
    createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP, categoriesMap);
