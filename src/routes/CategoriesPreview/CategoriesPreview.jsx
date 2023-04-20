import { useSelector } from 'react-redux';

import CategoryPreview from 'components/CategoryPreview/';
import Spinner from 'components/Spinner/Spinner';
import { selectCategoriesIsLoading, selectCategoriesMap } from 'store/categories/categories.selector';

const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);

    return (
        <>
            {isLoading ? (
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
