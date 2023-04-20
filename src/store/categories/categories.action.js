import { getCategoriesAndDocuments } from 'utils/firebase';
import { createAction } from 'utils/reducer';
import { CATEGORIES_ACTION_TYPES } from './categories.type';

export const fetchCategoriesStart = () => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categories) =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categories);

export const fetchCategoriesFailed = (error) => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);

export const fetchCategoriesAsync = () => async (dispatch) => {
    dispatch(fetchCategoriesStart());

    try {
        const categoriesMap = await getCategoriesAndDocuments();
        dispatch(fetchCategoriesSuccess(categoriesMap));
    } catch (error) {
        dispatch(fetchCategoriesFailed(error));
    }
};
