import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import { auth, provider } from "../firebase"
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth'
import './Login.css'

function Login({setIsAuth}) {
    const navigate = useNavigate(); // Handle navigate to home page after authenticated

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            localStorage.setItem("isAuth", true);
            setIsAuth(true);
            navigate("/");
        });
    }

    return (
        <div className="login-page">
            <p>Sign In With Your Account</p>

            <button className="login-with-google-btn" onClick={signInWithGoogle}>Sign In</button>
        </div>
    );
}

export default Login;