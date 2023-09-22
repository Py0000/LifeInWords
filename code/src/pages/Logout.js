import React from "react";
import { useNavigate } from "react-router-dom"
import { auth, provider } from "../firebase"
import { signOut } from "firebase/auth";

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
        <div>
            <p>Do you wish to logout?</p>
            <button onClick={signUserOut}>Confirm Logout</button>
            <button onClick={cancelHandler}>Cancel</button>
        </div>
    );
}

export default Logout;