import { useContext } from 'react';

import CategoryPreview from 'components/CategoryPreview/';
import Spinner from 'components/Spinner/Spinner';
import { CategoriesContext } from 'contexts/categories.context';

const CategoriesPreview = () => {
    const { categoriesMap, loading } = useContext(CategoriesContext);

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                Object.keys(categoriesMap).map((key) => {
                    const products = categoriesMap[key];
                    return <CategoryPreview key={key} title={key} products={products} />;
                })
            )}
        </>
    );
};

export default CategoriesPreview;
