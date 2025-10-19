import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';
import axios from 'axios';


const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null)

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const signOutUser = (email, password) => {
    setLoading(true);
    return signOut(auth);
  };
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, currentUser =>{
        setUser(currentUser);
        if(currentUser?.email){
          const userData = {email: currentUser.email}
          axios.post('https://volunteer-servers.vercel.appjwt',userData,{
            withCredentials: true
          }).then(res => {
            console.log( 'token after jwt',res.data)
            

          })
          .catch(error => console.log(error))
          
        }
        setLoading(false)
         console.log('user in auth state cng', currentUser)

    })
    return () =>{
        unSubscribe()
    }

  },[])

  const authInfo = {
    loading,
    user,
    createUser,
    signOutUser,
    signInUser,
    signInWithGoogle
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
