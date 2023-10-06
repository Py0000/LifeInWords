import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home';
import AddPost from './pages/AddPost';
import Login from './pages/Login';
import NavigationBar from './navigation_bar/NavigationBar';
import { useState } from 'react';
import Logout from './pages/Logout';
import Profile from './pages/Profile';
import ReviewsContext from './pages/ReviewsContext.js';  

function App() {
    const [isAuth, setIsAuth] = useState(false);
    const [globalReviews, setGlobalReviews] = useState([]);

    return (
        <BrowserRouter>
            <ReviewsContext.Provider value={{ globalReviews, setGlobalReviews }}>
                <NavigationBar isAuth={isAuth} />
                <Routes>
                    <Route path='/' element={<Home />} />
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
