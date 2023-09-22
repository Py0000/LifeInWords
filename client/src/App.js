import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './pages/Home';
import AddPost from './pages/AddPost';
import Login from './pages/Login';
import NavigationBar from './NavigationBar';

function App() {
  return (
    <BrowserRouter>
      <NavigationBar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/addpost" element={<AddPost/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
