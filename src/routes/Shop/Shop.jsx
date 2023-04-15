import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import CategoriesPreview from 'routes/CategoriesPreview';
import Category from 'routes/Category';
import { setCategories } from 'store/categories/categories.action';
import { getCategoriesAndDocuments } from 'utils/firebase';

const Shop = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoriesMap = await getCategoriesAndDocuments();
            dispatch(setCategories(categoriesMap));
        };

        getCategoriesMap();
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
