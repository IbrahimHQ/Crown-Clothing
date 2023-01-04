import { useContext, useState, useEffect, Fragment } from 'react';
import { CategoriesContext } from '../../../contexts/categories.context';
import { useParams } from 'react-router-dom';
import ProductCard from '../../product-card/product-card.components';
import Spinner from '../../spinner/spinner.component';
import { CategoryContainerStyled, CategoryTitleStyled} from './category.styles';


const CategoryPage = () => {
    const { category } = useParams();
    const { categoriesMap, loading } = useContext(CategoriesContext);

    const [products, setProducts] = useState(categoriesMap[category]);
    useEffect(() => {
        setProducts(categoriesMap[category])
    }, [category, categoriesMap]) //so that product only resets with category or map changes

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