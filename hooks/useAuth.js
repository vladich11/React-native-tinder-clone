//ContextApi
import React, { createContext, useContext, useState, useEffect , useMemo } from 'react'
import { View, Text } from 'react-native'
import * as Google from "expo-google-app-auth";
import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithCredential,
    signOut,
} from "@firebase/auth"

import { auth } from "../firebase";

const AuthContext = createContext({
    //initial state of the context (empty state)
});

// Tell google what we need
// TODO: IF GOING TO PROD WE NEED ENV VARIABLES!
const config = {
    androidClientId: '503175432454-agr2oa49kqlbak0ouudt9ivrkha9ts5q.apps.googleusercontent.com', // 503175432454-f32ejqksid4akk2sb07s50nc2g62hhob.apps.googleusercontent.com
    iosClientId: '503175432454-6qnh52ul8bl32c368a7tqo7brqber3cu.apps.googleusercontent.com',
    scopes: ["profile", "email"],
    permissions: ["public_profile", "email", "gender", "location"],
}

//Children is eveything that sits under this component
// Auth provider is a functional component -> all state stuff works here
export const AuthProvider = ({ children }) => {



    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    // get rid of the delay when logging in 
    const [loadingInitial, setLoadingInitial] = useState(true);
    // Loading state -> UI Blocking logic
    const [loading, setLoading] = useState(false)


    //When component or auth.provider mounts this runs (unsub trick)
    useEffect(
        () =>
            onAuthStateChanged(auth, user => {
                if (user) {
                    // Logged in .. 
                    setUser(user);
                } else {
                    //Not logged in ..
                    setUser(null)
                }

                setLoadingInitial(false)
            }),
        []
    );

    const logout = () => {
        setLoading(true);
        //Fire base function that logout the user with this auth.
        signOut(auth)
            .catch(error => setError(error))
            .finally(() => setLoading(false));
    }
    const signInWithGoogle = async () => {
        setLoading(true);
        await Google.logInAsync(config).then(async logInResult => {

            if (logInResult.type === 'success') {

                // Destructure idtoken and access token from the login.
                const { idToken, accessToken } = logInResult;

                // Construct a credential from that login -> pass this special credential to firebase.
                const credential = GoogleAuthProvider.credential(idToken, accessToken);

                // sign in using fire base authentication.
                await signInWithCredential(auth, credential);
            }

            return Promise.reject();
        })
            .catch(error => setError(error))
            .finally(() => { setLoading(false) });


    };


    const memoedValue = useMemo(() => ({
        user,
        loading,
        error,
        signInWithGoogle,
        logout,
    }), [user, loading, error]) //   Will update only when user,loading,error changes.

    //  There is a problem when some of this values change will re-render the entire list.
    return (
        <AuthContext.Provider value={memoedValue} >
            {/* if the there is no loadingInitial load children */}
            {!loadingInitial && children}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    return useContext(AuthContext)
}


/*
useMemo :

    The useMemo is a hook used in the functional component of react that returns a memoized value.
    In Computer Science, memoization is a concept used in general when we don’t need to recompute the function
    with a given argument for the next time as it returns the cached result. A memoized function remembers
    the results of output for a given set of inputs. For example, if there is a function to add two numbers,
    and we give the parameter as 1 and 2 for the first time the function will add these two numbers and return 3,
    but if the same inputs come again then we will return the cached value i.e 3 and not compute with the add function again.
    In react also, we use this concept, whenever in the React component, the state and props do not change the component and
    the component does not re-render, it shows the same output. The useMemo hook is used to improve performance in our React application.
*/
