// NavigationBar.js
import { Link } from "react-router-dom";
import './NavigationBar.css'

function NavigationBar({isAuth}) {
  return (
    <div>
      <nav>
        <h1 className="nav-title">Life In Words</h1>
        <div className="nav-links">
          {isAuth &&<Link to="/">Home</Link>}
          {isAuth && <Link to="/addpost"> Create Post </Link>}
          {isAuth && <Link to="/logout"> Logout </Link>}
          {!isAuth && <Link to="/login"> Login </Link>}
        </div>
      </nav>
    </div>
    
  );
}

export default NavigationBar;
