import { Suspense, lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

// import SHOP_DATA from 'mock-data/shop-data';
import Spinner from 'components/Spinner/Spinner';
import { checkUserSession } from 'store/user/user.action';
// import { addCollectionAndDocuments } from 'utils/firebase';

const Home = lazy(() => import('routes/Home'));
const Navigation = lazy(() => import('routes/Navigation'));
const Checkout = lazy(() => import('routes/Checkout'));
const Shop = lazy(() => import('routes/Shop'));
const Authentication = lazy(() => import('routes/Authentication'));

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkUserSession());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Suspense fallback={<Spinner />}>
            <Routes>
                <Route path="/" element={<Navigation />}>
                    <Route index element={<Home />} />
                    <Route path="shop/*" element={<Shop />} />
                    <Route path="auth" element={<Authentication />} />
                    <Route path="checkout" element={<Checkout />} />
                </Route>
            </Routes>
        </Suspense>
    );
};

export default App;
