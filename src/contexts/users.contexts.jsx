import { createContext, useEffect, useReducer } from "react";
import { onAuthStateChangedListener, createUserDocfromAuth } from "../utils/firebase/firebase.utils";
import { createAction } from "../utils/reducers/reducer.utils";

export const UserContext = createContext({
    setCurrentUser: () => null,
    currentUser: null
});

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
};

const userReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER: 
            return {
                ...state, //spread in all current values for user in state
                currentUser: payload
             };
        default:
            throw new Error (`Unhandled type ${type} in userReducer`);
    };
};

const INITIAL_STATE = {
    currentUser: null
};

export const UserProvider = ({ children }) => {
    const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);
    const setCurrentUser = (user) => {
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user ));
    };

    useEffect (() => { 
        const unsubscribe = onAuthStateChangedListener((user) => {
            if(user) {
                createUserDocfromAuth(user);
            }
            setCurrentUser(user);
        });
        return unsubscribe
    }, []); //runs once when component mounts

    const value = { currentUser };

    return <UserContext.Provider value={value}>{ children }</UserContext.Provider>;
};
//props.children --> a generic placeholder that displays any children (things between opening and closing tags) when calling a component