import React from "react";
import { useNavigate } from "react-router-dom"
import { auth, provider } from "../firebase"
import { signInWithPopup } from 'firebase/auth'
import './Login.css'

function Login({setIsAuth}) {
    const navigate = useNavigate(); // Handle navigation to home page after being authenticated

    // Make use of firebase console authentication with google account API
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            localStorage.setItem("isAuth", true);
            setIsAuth(true);
            navigate("/");
        });
    }

    return (
        <div className="login-page">
            <div>
                <h1>WELCOME!</h1>
            </div>
            <div className="login-box">
                <h3>Sign In With Your Google Account</h3>
                <button className="login-with-google-btn" onClick={signInWithGoogle}>Google</button>
            </div>
        </div>
    );
}

export default Login;