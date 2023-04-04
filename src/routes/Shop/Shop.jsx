import { Route, Routes } from 'react-router-dom';

import CategoriesPreview from 'routes/CategoriesPreview/CategoriesPreview';
import './shop.styles.scss';

const Shop = () => {
    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
        </Routes>
    );
};

export default Shop;
