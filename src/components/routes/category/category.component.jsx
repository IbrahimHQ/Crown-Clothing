import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery, useMutation} from '@apollo/client';

import ProductCard from '../../product-card/product-card.components';
import Spinner from '../../spinner/spinner.component';
import { CategoryContainerStyled, CategoryTitleStyled} from './category.styles';

const GET_CATEGORY = gql`
    query($title: String!) {
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

/* TO MUTATE CATEGORY DATA
const SET_CATEGORY = gql`
    mutation($category: Category!) {
        addCategory(category: $category) {  """ this mutation is defined in schema """
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
`;*/

const CategoryPage = () => {
    const { category } = useParams();
    const [products, setProducts] = useState([]);

    const {loading, error, data} = useQuery(GET_CATEGORY, {
        variables: {
            title: category
        }
    });

/*  const [ addCategory, {loading, error, data} ] = useMutation(SET_CATEGORY);
    addCategory({ variables: { category: categoryObject } }); //categoryObject is passed in from elsewhere
 */

    useEffect(() => {
        if (data) {
            const { getCollectionsByTitle: { items }} = data;
            setProducts(items);
        }
    }, [category, data]) //transform data to pass into useState

    useEffect (() => {
        window.scrollTo(0,0);
    }, []); //resets scroll to top of page when page renders

    return (
        <Fragment>
            {
                loading ? (
                    <Spinner />
                ) : (
                    <Fragment>
                        <CategoryTitleStyled>{category.toUpperCase()}</CategoryTitleStyled>
                        <CategoryContainerStyled>
                            {products && //safeguard to only render if products data is present due to async functions
                            products.map((product) => 
                                <ProductCard key={product.id} product={product} />
                            )}
                        </CategoryContainerStyled>
                    </Fragment>
                )
            }
        </Fragment>

    )
};

export default CategoryPage;