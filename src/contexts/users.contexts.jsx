import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener, createUserDocfromAuth, signOutUser } from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState (null);
    const value = { currentUser, setCurrentUser };
    //signOutUser();

    useEffect (() => { 
        const unsubscribe = onAuthStateChangedListener((user) => {
            if(user) {createUserDocfromAuth(user)};
            setCurrentUser(user);
        });
        return unsubscribe
    }, []); //runs once when component mounts

    return <UserContext.Provider value={value}>{ children }</UserContext.Provider>;
};
//props.children --> a generic placeholder that displays any children (things between opening and closing tags) when calling a component