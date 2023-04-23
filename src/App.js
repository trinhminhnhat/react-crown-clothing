import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

// import SHOP_DATA from 'mock-data/shop-data';
import Authentication from 'routes/Authentication';
import Checkout from 'routes/Checkout';
import Home from 'routes/Home';
import Navigation from 'routes/Navigation';
import Shop from 'routes/Shop';
import { setCurrentUser } from 'store/user/user.slice';
import { createUserDocumentFromAuth, onAuthStateChangeListener } from 'utils/firebase';
// import { addCollectionAndDocuments } from 'utils/firebase';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChangeListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }

            const pickedUser = user && (({ accessToken, email }) => ({ accessToken, email }))(user);

            dispatch(setCurrentUser(pickedUser));
        });

        // run the first time to create collection
        // addCollectionAndDocuments('categories', SHOP_DATA);

        return () => unsubscribe;

        // dispatch will never change, not necessary to add dispatch in dependency
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
