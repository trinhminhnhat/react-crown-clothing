import { all, call, put, takeLatest } from 'typed-redux-saga/macro';

import { getCategoriesAndDocuments } from 'utils/firebase';
import { fetchCategoriesFailed, fetchCategoriesSuccess } from './categories.action';
import { CATEGORIES_ACTION_TYPES } from './categories.type';

export function* fetchCategoriesAsync() {
    try {
        // 'categories' is argument of getCategoriesAndDocuments function
        const categoriesMap = yield* call(getCategoriesAndDocuments, 'categories');
        yield* put(fetchCategoriesSuccess(categoriesMap));
    } catch (error) {
        yield* put(fetchCategoriesFailed(error as Error));
    }
}

export function* onFetchCategories() {
    yield* takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync);
}

export function* categoriesSaga() {
    yield* all([call(onFetchCategories)]);
}
