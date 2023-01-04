import { createContext, useState, useEffect, PropsWithChildren } from "react";
import { onAuthStateChangedListener, createUserDocfromAuth } from "../utils/firebase/firebase.utils";
import { User } from "firebase/auth";
import { FC } from "react";

type UserContextType = {
    currentUser: User | null
};

export const UserContext = createContext<UserContextType>({
    currentUser: null,
});

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const value = { currentUser, setCurrentUser };

    useEffect (() => { 
        const unsubscribe = onAuthStateChangedListener((user) => {
            if(user === null) return
            createUserDocfromAuth(user);
            setCurrentUser(user);
        });
        return unsubscribe
    }, []); //runs once when component mounts

    return <UserContext.Provider value={value}>{ children }</UserContext.Provider>;
};
//props.children --> a generic placeholder that displays any children (things between opening and closing tags) when calling a component