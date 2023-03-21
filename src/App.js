import { Route, Routes } from 'react-router-dom';

import Home from 'routes/Home';
import Navigation from 'routes/Navigation';

const Shop = () => {
    return <div>This is shop component</div>;
};

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigation />}>
                <Route index element={<Home />} />
                <Route path="shop" element={<Shop />} />
            </Route>
        </Routes>
    );
};

export default App;
