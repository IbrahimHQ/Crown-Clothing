import { Fragment, useContext } from "react";
import { CategoriesContext } from "../../../contexts/categories.context";
import CategoryPreview from "../../category-preview/category-preview.component";


const CategoriesPreview = () => {
    const { categoriesMap } = useContext(CategoriesContext);
    console.log(categoriesMap);
    const keysArray = Object.keys(categoriesMap) //object.keys allows you to pass in an object, returns an array of the keys
    return (
        <Fragment>
            {keysArray.map(title => {
                const products = categoriesMap[title];
                return <CategoryPreview key='title' title={title} products={products}/>
            })}
        </Fragment>
    )
}

export default CategoriesPreview;