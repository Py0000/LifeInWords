import React, { useEffect, useContext } from "react";
import { getDocs, collection } from 'firebase/firestore'
import { db } from "../firebase";
import './Home.css'
import ReviewsContext from './ReviewsContext.js';  

function Home() {
    const { globalReviews, setGlobalReviews } = useContext(ReviewsContext);

    useEffect(() => {
        const reviewsCollectionRef = collection(db, "reviews");

        // Made a call to firebase to retrieve the information from the database
        // Arg 1: reference to the database collection (i.e. "table") you want to the info add to
        // Arg 2: Data that should be added
        const getReviews = async () => {
            const reviewData = await getDocs(reviewsCollectionRef);
            setGlobalReviews(reviewData.docs.map((doc) => ({...doc.data(), id: doc.id})));
        }

        getReviews();
    }, []);

    return (
        <div className="home-page">
            {globalReviews.map((review) => {
                return <div className="review">
                    <div className="review-header"> 
                        <div className="title"> 
                            <h1> {review.title} </h1>
                        </div>
                    </div>

                    <div className="review-author-rating">
                        By: {review.author}
                    </div>

                    <div className="review-author-rating">
                        Rating: {review.rating}/5
                    </div>

                    <div className="review-container">
                        {review.review}
                    </div>

                    <div className="h4-container">
                        <h4>@{review.createdBy.name}</h4>
                        <h4>{review.dateCreated.toDate().toLocaleDateString()}</h4>
                    </div>
                </div>
            })}
        </div>
    );
}

export default Home;