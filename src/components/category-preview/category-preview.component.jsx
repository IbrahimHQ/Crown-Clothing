import './category-preview.styles.scss';
import ProductCard from '../product-card/product-card.components';
import { Link } from 'react-router-dom';

const CategoryPreview = ({ title, products }) => {
    const productsPreview = products.slice(0,4);

    return (
        <div className='category-preview-container'>
            <h2>
                <Link className='title' to={title}>
                    {title.toUpperCase()}
                </Link>
            </h2>
            <div className='preview'>
                {productsPreview.map((product) => ( 
                    <ProductCard key={product.id} product={product}/>
                ))}
            </div>
        </div>
    )
};

export default CategoryPreview;