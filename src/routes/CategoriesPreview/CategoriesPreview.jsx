import { useSelector } from 'react-redux';

import CategoryPreview from 'components/CategoryPreview/';
import { selectCategoriesMap } from 'store/categories/categories.selector';

const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap);

    return (
        <>
            {Object.keys(categoriesMap).map((key) => {
                const products = categoriesMap[key];
                return <CategoryPreview key={key} title={key} products={products} />;
            })}
        </>
    );
};

export default CategoriesPreview;
