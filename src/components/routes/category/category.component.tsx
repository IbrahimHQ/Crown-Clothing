import { useContext, useState, useEffect, Fragment } from 'react';
import { CategoriesContext } from '../../../contexts/categories.context';
import { useParams } from 'react-router-dom';
import ProductCard from '../../product-card/product-card.components';
import { CategoryContainerStyled, CategoryTitleStyled} from './category.styles';

type CategoryRouteParams = {
    category: string;
}

const Category = () => {
    const { category } = useParams<keyof CategoryRouteParams>() as CategoryRouteParams;
    const { categoriesMap } = useContext(CategoriesContext);

    const [products, setProducts] = useState (categoriesMap[category]);
    useEffect(() => {
        setProducts(categoriesMap[category])
    }, [category, categoriesMap])

    useEffect (() => {
        window.scrollTo(0,0);
    }, []); //resets scroll to top of page 

    return (
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
};

export default Category;