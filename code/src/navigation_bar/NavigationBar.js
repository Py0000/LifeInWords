import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faHome, faUser, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
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
                    {isAuth && <Link to="/"><FontAwesomeIcon icon={faHome} /></Link>}
                    {isAuth && <Link to="/addpost"><FontAwesomeIcon icon={faPlusSquare} /></Link>}
                    {isAuth && <Link to="/profile"><FontAwesomeIcon icon={faUser} /></Link>}
                    {isAuth && <Link to="/logout"> <FontAwesomeIcon icon={faSignOutAlt}/></Link>}
                    {!isAuth && <Link to="/login"> Login </Link>}
                </div>
            </nav>
        </div>
    );
}

export default NavigationBar;
