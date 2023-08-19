// 'use client'
// import { createContext, useContext, useState, useEffect } from "react";
// import { onAuthStateChanged, signOut as authSignOut } from "firebase/auth";
// import { auth } from "./firebaseConfig";


// // here we are making a context 
// const AuthUserContext = createContext({
//   authUser: null,
//   isLoading: true,
// });

// export default function useFirebaseAuth() {
//   const [authUser, setAuthUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const clear = () => {
//     setAuthUser(null);
//     setIsLoading(false);
//   };

//   const authStateChanged = async (user) => {
//     setIsLoading(true);
//     if (!user) {
//       clear();
//       return;
//     }
//     setAuthUser({
//       uid: user.uid,
//       email: user.email,
//       username: user.displayName,
//     });
//     setIsLoading(false);
//   };

//   const signOut = () => {
//     authSignOut(auth).then(() => clear());
//   };

//   useEffect(() => {
//     const unSubscribe = onAuthStateChanged(auth, authStateChanged);
//     return () => unSubscribe();
//   }, []);

//   return {
//     authUser,
//     isLoading,
//     setAuthUser,
//     signOut,
//   };
// }



// // this is the auth state here getting value
// export const authUserProvider = ({ children }) => {
//   const auth = useFirebaseAuth();

//   return (
//     <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthUserContext);



'use client'
import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut as authSignOut } from "firebase/auth";
import { auth } from "./firebaseConfig";

const AuthUserContext = createContext({
    authUser: null,
    isLoading: true,
});

export default function useFirebaseAuth() {
  console.log("auth context imported")
    const [authUser, setAuthUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const clearUser = () => {
        setAuthUser(null);
        setIsLoading(false);
    };
    const consol = () => {
      console.log("authContext console");
    };
  
    useEffect(() => {
      consol();
    }, []);
    const authStateChanged = async (user) => {
        setIsLoading(true);
        if (!user) {
          console.log("if part is renning msg from auth")
            clearUser();
            return;
        }
        console.log(user)
        setAuthUser({
            uid: user.uid,
            email: user.email,
            username: user.displayName,
        });
        setIsLoading(false);
    };

    const signOut = () => {
        authSignOut(auth).then(() => clearUser());
    };

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, authStateChanged);
        return () => unSubscribe();
    }, []);

    return {
        authUser,
        isLoading,
        signOut,
        setAuthUser,
    };
}

export const AuthUserProvider = ({ children }) => {
    const auth = useFirebaseAuth();
    return (
        <AuthUserContext.Provider value={auth}>
            {children}
        </AuthUserContext.Provider>
    );
};

export const useAuth = () => useContext(AuthUserContext);
