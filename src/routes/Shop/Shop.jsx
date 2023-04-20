import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import CategoriesPreview from 'routes/CategoriesPreview';
import Category from 'routes/Category';
import { fetchCategoriesAsync } from 'store/categories/categories.action';

const Shop = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategoriesAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=":category" element={<Category />} />
        </Routes>
    );
};

export default Shop;
