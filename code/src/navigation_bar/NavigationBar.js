import { Link } from "react-router-dom";
import './NavigationBar.css'

// isAuth: A prop which indicates if the user is already authenticated
function NavigationBar({isAuth}) {
  
    // displays all the relavent buttons in the navigation bar based on the user authentication status
    // Only displays login button if user is not yet authenticated
    // If user is authenticated, display the other buttons
    return (
        <div>
            <nav>
                <h1 className="nav-title">Life In Words</h1>
                <div className="nav-links">
                    {isAuth &&<Link to="/">Home</Link>}
                    {isAuth && <Link to="/addpost"> Create Post </Link>}
                    {isAuth && <Link to="/profile"> My Profile </Link>}
                    {isAuth && <Link to="/logout"> Logout </Link>}
                    {!isAuth && <Link to="/login"> Login </Link>}
                </div>
            </nav>
        </div>
    );
}

export default NavigationBar;
