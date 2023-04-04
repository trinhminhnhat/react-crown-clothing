import { createContext, useState, useEffect } from 'react';

import { getCategoriesAndDocuments } from 'utils/firebase';

export const CategoriesContext = createContext({
    categories: {},
});

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({});
    const value = { categoriesMap };

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoriesMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoriesMap);
        };

        getCategoriesMap();
    }, []);

    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>;
};
