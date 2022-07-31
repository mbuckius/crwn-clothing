import { connectFirestoreEmulator } from "firebase/firestore";
import { createContext, useEffect, useReducer } from "react";
import { onAuthStateChangedListener, signOutUse, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

import { createAction } from "../utils/reducer/reducer.utils";

//as the actual value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

const INITIAL_STATE = {
    currentUser: null
}

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const userReducer = (state, action) => {
    const { type, payload } = action;

    switch(type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }
        
        defualt:
            throw new Error(`Unhandled type ${type} in userReducer`);
    }
};

export const UserProvider = ({ children }) => {
    const [ state, dispatch ] = useReducer(userReducer, INITIAL_STATE);
    const { currentUser } = state;

    const setCurrentUser = (user) => {
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });

        return unsubscribe;
    }, []);

    const value = { currentUser, setCurrentUser};

    return <UserContext.Provider value={value} >{children}</UserContext.Provider>
}

//reducers are functions that return a new object