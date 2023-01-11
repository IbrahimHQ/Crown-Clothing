import { Routes, Route } from 'react-router-dom';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import CategoryPage from '../category/category.component';
import { CategoriesProvider } from '../../contexts/categories.context';

const Shop = () => {
    return (
        <CategoriesProvider>
            <Routes>
                <Route index element={<CategoriesPreview/>} />
                <Route path=":category" element={<CategoryPage/>} />
            </Routes>
        </CategoriesProvider>
    )
};

export default Shop;