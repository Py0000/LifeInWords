import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "./firebase"

import NavigationBar from './navigation_bar/NavigationBar';
import Redirection from './pages/Redirection';
import Home from './pages/Home';
import AddPost from './pages/AddPost';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Profile from './pages/Profile';
import ReviewsContext from './pages/ReviewsContext.js';  

import './App.css';

function App() {
    const [isAuth, setIsAuth] = useState(false);
    const [globalReviews, setGlobalReviews] = useState([]);

    // Checks the authentication status and updates accordingly when this functions is called everytime
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuth(true);  // if user is authenticated, set isAuth to true
            } else {
                setIsAuth(false);
            }
        });

        return () => unsubscribe(); // Cleanup the listener on unmount
    }, []);

    // If user is not authenticated and attempts to visit the url that ends with /, it will redirect user to /login page instead.
    return (
        <BrowserRouter>
            <ReviewsContext.Provider value={{ globalReviews, setGlobalReviews }}>
                <NavigationBar isAuth={isAuth} />
                <Routes>
                    <Route path='/' element={isAuth ? <Home /> : <Redirection isAuth={isAuth} />} />
                    <Route path="/addpost" element={<AddPost isAuth={isAuth} />} />
                    <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
                    <Route path="/logout" element={<Logout setIsAuth={setIsAuth} />} />
                    <Route path="/profile" element={<Profile isAuth={isAuth} />} />
                </Routes>
            </ReviewsContext.Provider>
        </BrowserRouter>
    );
}

export default App;
