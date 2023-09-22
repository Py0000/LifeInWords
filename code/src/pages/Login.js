import React from "react";
import { auth, provider } from "../firebase"
import { signInWithPopup } from 'firebase/auth'

function Login({setIsAuth}) {

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            localStorage.setItem("isAuth", true);
            setIsAuth(true);
        });
    }

    return (
        <div>
            <p>Sign In With Your Account</p>
            <button onClick={signInWithGoogle}>Sign In</button>
        </div>
    );
}

export default Login;