import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './pages/Home';
import AddPost from './pages/AddPost';
import Login from './pages/Login';
import NavigationBar from './NavigationBar';
import { useState } from 'react';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <BrowserRouter>
      <NavigationBar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/addpost" element={<AddPost/>} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
