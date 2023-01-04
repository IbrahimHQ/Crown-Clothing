import React, { createContext, useState, useEffect, ChildContextProvider, PropsWithChildren } from "react";
//import SHOP_DATA from '../shop-data.js';
import { addCollectionandDocuments, getCategoriesandDocuments } from "../utils/firebase/firebase.utils";
import { CategoryMap} from "./category.types";
import { FC } from 'react';

type CategoriesContextType = {
    categoriesMap: CategoryMap
};

export const CategoriesContext = createContext<CategoriesContextType>({
    categoriesMap: {} as CategoryMap
});

export const CategoriesProvider: FC<PropsWithChildren> = ({ children }) => {
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