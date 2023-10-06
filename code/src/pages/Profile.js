import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase"
import { collection, where, query, getDocs, deleteDoc, doc } from 'firebase/firestore';
import './Profile.css'
import ReviewsContext from './ReviewsContext.js';  

function Profile({isAuth}) {
    const navigate = useNavigate(); 
    const { globalReviews, setGlobalReviews } = useContext(ReviewsContext);

    const [accountName, setAccountName] = useState(""); 
    const [profilePic, setProfilePic] = useState("");
    const [userReviews, setUserReviews] = useState([]);


    // Delete the review
    const deletePost = async (id) => {
        const reviewDoc = doc(db, "reviews", id)
        await deleteDoc(reviewDoc);
        const updatedReviews = globalReviews.filter(review => review.id !== id);
        setGlobalReviews(updatedReviews);
        fetchUserReviews();
    }

    // Fetch user's posts from Firestore
    const fetchUserReviews = async () => {
        const q = query(
            collection(db, 'reviews'), 
            where('createdBy.id', '==', auth.currentUser.uid)
        );

        const querySnapshot = await getDocs(q);
        setUserReviews(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };


    // Guard function (additional security measure)
    // Redirect user to login page if not authenticated
    // Checks immediately when this component is rendered
    useEffect(() => {
        if (!isAuth) {
            navigate("/login");
        } else {
            // If authenticated, set the account's name
            setAccountName(auth.currentUser.displayName);
            setProfilePic(auth.currentUser.photoURL || 'code\\src\\icons\\defaultProfile.png');
            fetchUserReviews();
        }
    }, [isAuth, navigate]);

    return (
    <div className="profile-main">
        <div className="profile-details">
            <div className="profile-box">
                <img src={profilePic} alt="Profile" className="profile-pic"/>
                <div className="account-name">
                    {accountName}
                </div>
            </div>
        </div>
    
        <div className="user-reviews-container">
            {userReviews.map(review => (
                <div key={review.id} className="user-post-wrapper"> {/* Key is placed here */}
                    <div className="user-post">
                        <h2>{review.title}</h2>
                        <p>By: {review.author}</p>
                    </div>
                    <div className="delete-button-wrapper">
                        <button onClick={() => deletePost(review.id)}>
                            &#128465;
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);    

}

export default Profile;