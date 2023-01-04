import { Routes, Route } from 'react-router-dom';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import CategoryPage from '../category/category.component';

const Shop = () => {
    return (
        <Routes>
            <Route index element={<CategoriesPreview/>} />
            <Route path=":category" element={<CategoryPage/>} />
        </Routes>
    )
}

export default Shop;