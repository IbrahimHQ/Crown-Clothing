import { createContext, useState, useEffect} from "react";
import { gql, useQuery } from '@apollo/client';

export const CategoriesContext = createContext({
    categoriesMap: {}
});

const GET_COLLECTIONS = gql`
    query GetCollections{
        collections {
            id
            title
            items {
                id
                name
                price
                imageUrl
            }
        }
    }
`;

export const CategoriesProvider = ({ children }) => {
    const {loading, error, data} = useQuery(GET_COLLECTIONS);
    const [categoriesMap, setCategoriesMap] = useState({});
    console.log("data:", data)

    useEffect(() => { //transforms data from graphql into categoriesMap
        if (data) {
            const { collections } = data;
            const collectionsMap = collections.reduce((acc, collection) => {
                const { title, items } = collection;
                acc[title.toLowerCase()] = items;
                return acc;
            }, {});
            setCategoriesMap(collectionsMap);
        };
    }, [data])


    const value = { categoriesMap, loading };
    return (
        <CategoriesContext.Provider value={value}>{ children }</CategoriesContext.Provider>
    )
}