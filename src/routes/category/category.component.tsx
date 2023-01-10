import { useContext, useState, useEffect, Fragment } from 'react';
import { CategoriesContext } from '../../contexts/categories.context';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/product-card/product-card.components';
import { CategoryContainerStyled, CategoryTitleStyled} from './category.styles';

type CategoryRouteParams = {
    category: string;
}

const CategoryPage = () => {
    const { category } = useParams<keyof CategoryRouteParams>() as CategoryRouteParams; //key of allows for other parameters from shop page to come into category as well
    const { categoriesMap } = useContext(CategoriesContext);

    const [products, setProducts] = useState(categoriesMap[category]);
    useEffect(() => {
        setProducts(categoriesMap[category])
    }, [category, categoriesMap]) //so that product only resets with category or map changes

    useEffect (() => {
        window.scrollTo(0,0);
    }, []); //resets scroll to top of page when page renders

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

export default CategoryPage;