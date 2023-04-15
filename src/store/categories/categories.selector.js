export const selectCategoriesMap = (state) =>
    state.categories.categories.reduce((acc, categories) => {
        const { title, items } = categories;
        acc[title.toLowerCase()] = items;

        return acc;
    }, {});
