import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { CartProvider } from 'contexts/cart.context';
import { CategoriesProvider } from 'contexts/categories.context';
import { UserProvider } from 'contexts/user.context';
import App from './App';
import './index.scss';
import reportWebVitals from './reportWebVitals';

const client = new ApolloClient({
    uri: 'https://crwn-clothing.com/',
    cache: new InMemoryCache(),
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <BrowserRouter>
                <UserProvider>
                    <CategoriesProvider>
                        <CartProvider>
                            <App />
                        </CartProvider>
                    </CategoriesProvider>
                </UserProvider>
            </BrowserRouter>
        </ApolloProvider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
