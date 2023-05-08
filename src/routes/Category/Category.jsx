import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ProductCard from 'components/ProductCard/ProductCard';
import Spinner from 'components/Spinner/Spinner';
import { CategoryContainer, Title } from './category.styles';

const GET_CATEGORY = gql`
    query ($title: String!) {
        getCollectionsByTitle(title: $title) {
            id
            title
            items {
                id
                name
                price
                imageUrl
            }
        }
    }
`;

const Category = () => {
    const { category } = useParams();
    const { data, loading } = useQuery(GET_CATEGORY, {
        variables: {
            title: category,
        },
    });
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (data) {
            const {
                getCollectionsByTitle: { items },
            } = data;

            setProducts(items);
        }
    }, [category, data]);

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <Title>{category.toUpperCase()}</Title>
                    <CategoryContainer>
                        {products && products.map((product) => <ProductCard key={product.id} product={product} />)}
                    </CategoryContainer>
                </>
            )}
        </>
    );
};

export default Category;
