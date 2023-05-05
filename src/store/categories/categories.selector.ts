import { createSelector } from 'reselect';

import { RootState } from 'store/store';
import { CategoriesState } from './categories.reducer';
import { CategoryMap } from './categories.type';

const selectCategoryReducer = (state: RootState): CategoriesState => state.categories;

export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.categories,
);

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories): CategoryMap =>
        categories.reduce((acc, categories) => {
            const { title, items } = categories;
            acc[title.toLowerCase()] = items;

            return acc;
        }, {} as CategoryMap),
);

export const selectCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading,
);
