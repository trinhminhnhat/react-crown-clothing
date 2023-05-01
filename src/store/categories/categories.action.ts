import { Action, ActionWithPayload, createAction, withMatcher } from 'utils/reducer';
import { CATEGORIES_ACTION_TYPES, Category } from './categories.type';

type FetchCategoriesStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>;

type FetchCategoriesSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>;

type FetchCategoriesFailed = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, Error>;

export const fetchCategoriesStart = withMatcher(
    (): FetchCategoriesStart => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START),
);

export const fetchCategoriesSuccess = withMatcher(
    (categories: Category[]): FetchCategoriesSuccess =>
        createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categories),
);

export const fetchCategoriesFailed = withMatcher(
    (error: Error): FetchCategoriesFailed => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error),
);
