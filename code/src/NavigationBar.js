// NavigationBar.js
import { Link } from "react-router-dom";
import './NavigationBar.css'

function NavigationBar() {
  return (
    <nav>
      <h1 className="nav-title">Life In Words</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/addpost">Add New Review</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}

export default NavigationBar;
