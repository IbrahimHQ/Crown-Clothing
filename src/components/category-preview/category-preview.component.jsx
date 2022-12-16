import { 
    CategoryPreviewContainerStyled, 
    TitleStyled, 
    PreviewStyled
} from './category-preview.styles';
import ProductCard from '../product-card/product-card.components';
//import { Link } from 'react-router-dom';

const CategoryPreview = ({ title, products }) => {
    const productsPreview = products.slice(0,4);

    return (
        <CategoryPreviewContainerStyled>
            <h2>
                <TitleStyled to={title}>
                    {title.toUpperCase()}
                </TitleStyled>
            </h2>
            <PreviewStyled>
                {productsPreview.map((product) => ( 
                    <ProductCard key={product.id} product={product}/>
                ))}
            </PreviewStyled>
        </CategoryPreviewContainerStyled>
    )
};

export default CategoryPreview;