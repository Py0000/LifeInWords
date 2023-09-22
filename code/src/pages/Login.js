import React from "react";
import { useNavigate } from "react-router-dom"
import { auth, provider } from "../firebase"
import { signInWithPopup } from 'firebase/auth'

function Login({setIsAuth}) {
    const navigate = useNavigate();

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            localStorage.setItem("isAuth", true);
            setIsAuth(true);
            navigate("/");
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