// NavigationBar.js
import { Link } from "react-router-dom";
import './NavigationBar.css'

function NavigationBar({isAuth}) {
  return (
    <nav>
      <h1 className="nav-title">Life In Words</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        {isAuth && <Link to="/createpost"> Create Post </Link>}
        {isAuth && <Link to="/logout"> Logout </Link>}
        {!isAuth && <Link to="/login"> Login </Link>}
      </div>
    </nav>
  );
}

export default NavigationBar;
