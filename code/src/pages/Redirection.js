import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// This function checks if user is authenticated when trying to access the url that ends with /.
// If not authenticated, redirect user to login page.
// Otherwise, can access page normally.
function Redirection({ isAuth }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) {
            navigate('/login');
        }
    }, [isAuth, navigate]);

    return null; // This component does not render anything
}

export default Redirection;