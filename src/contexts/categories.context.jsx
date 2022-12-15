import { createContext, useState, useEffect } from "react";
//import SHOP_DATA from '../shop-data.js';
import { addCollectionandDocuments, getCategoriesandDocuments } from "../utils/firebase/firebase.utils.js";

export const CategoriesContext = createContext({
    categoriesMap: []
});

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({});

    //used to add categories to firestore, but deleted to avoid resetting categories --> this is not normally done on frontend
/*     useEffect(() => {
        addCollectionandDocuments('categories', SHOP_DATA, 'title');
    }, []);
 */     

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesandDocuments();
            setCategoriesMap(categoryMap);
        } // an async function should never be passed into useEffect, instead create a new async function inside of an anonymous callback
        getCategoriesMap(); // then call the wrapping function
    }, []);


    const value = { categoriesMap };
    return (
        <CategoriesContext.Provider value={value}>{ children }</CategoriesContext.Provider>
    )
}