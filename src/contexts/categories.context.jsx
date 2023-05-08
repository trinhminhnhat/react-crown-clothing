import { gql, useQuery } from '@apollo/client';
import { createContext, useEffect, useState } from 'react';

export const CategoriesContext = createContext({
    categories: {},
});

const COLLECTIONS = gql`
    query GetCollections {
        collections {
            id
            title
            items {
                id
                name
                price
                imageUrl
            }
        }
    }
`;

export const CategoriesProvider = ({ children }) => {
    // eslint-disable-next-line no-unused-vars
    const { loading, error, data } = useQuery(COLLECTIONS);
    const [categoriesMap, setCategoriesMap] = useState({});
    const value = { categoriesMap, loading };

    useEffect(() => {
        if (data) {
            const { collections } = data;
            const collectionsMap = collections.reduce((acc, collections) => {
                const { title, items } = collections;
                acc[title.toLowerCase()] = items;

                return acc;
            }, {});

            setCategoriesMap(collectionsMap);
        }
    }, [data]);

    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>;
};
