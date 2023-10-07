import React from "react";
import { useNavigate } from "react-router-dom"
import { auth } from "../firebase"
import { signOut } from "firebase/auth";
import './Logout.css'


function Logout({setIsAuth}) {
    const navigate = useNavigate();

    const signUserOut = () => {
        signOut(auth).then(() => {
            localStorage.setItem("isAuth", false);
            setIsAuth(false);
            navigate("/login");
        })
    }

    const cancelHandler = () => {
        navigate("/")
    }

    return (
        <div className="logout-container">
            <p className="logout-text">Do you wish to logout?</p>
            <button className="logout-btn" onClick={signUserOut}>Yes</button>
            <button className="cancel-btn" onClick={cancelHandler}>Cancel</button>
        </div>
    );
}

export default Logout;