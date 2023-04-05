import { Route, Routes } from 'react-router-dom';

import CategoriesPreview from 'routes/CategoriesPreview';
import Category from 'routes/Category';
import './shop.styles.scss';

const Shop = () => {
    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=":category" element={<Category />} />
        </Routes>
    );
};

export default Shop;
