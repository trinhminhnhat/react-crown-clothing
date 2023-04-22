import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

// import SHOP_DATA from 'mock-data/shop-data';
import Authentication from 'routes/Authentication';
import Checkout from 'routes/Checkout';
import Home from 'routes/Home';
import Navigation from 'routes/Navigation';
import Shop from 'routes/Shop';
import { checkUserSession } from 'store/user/user.action';
// import { addCollectionAndDocuments } from 'utils/firebase';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkUserSession());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Navigation />}>
                <Route index element={<Home />} />
                <Route path="shop/*" element={<Shop />} />
                <Route path="auth" element={<Authentication />} />
                <Route path="checkout" element={<Checkout />} />
            </Route>
        </Routes>
    );
};

export default App;
