import React, { useEffect, useContext, useState } from "react";
import { getDocs, collection } from 'firebase/firestore'
import { db } from "../firebase";
import ReviewsContext from './ReviewsContext.js';  

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './Home.css'

function Home() {
    const { globalReviews, setGlobalReviews } = useContext(ReviewsContext);
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch data from a firebase database and update the home page with the reviews that are stored in the database
    useEffect(() => {
        // The database reference in the firebase console that stores all the data
        const reviewsCollectionRef = collection(db, "reviews");

        // Made a call to firebase to retrieve the information from the database
        // Arg 1: reference to the database collection (i.e. "table") you want to the info add to
        // Arg 2: Data that should be added
        const getReviews = async () => {
            const reviewData = await getDocs(reviewsCollectionRef);
            setGlobalReviews(reviewData.docs.map((doc) => ({...doc.data(), id: doc.id})));
        }

        getReviews();
    });

    return (
        <div className="home-page">
            
        <div className="search-container">
            <input 
                type="text" 
                placeholder="Search for a book title..." 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                className="search-input"
            />
            <FontAwesomeIcon icon={faSearch} className="search-icon"/>
        </div>

            {globalReviews
                .filter(review => review.title.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((review) => {
                    return <div className="review">
                        <div className="review-header"> 
                            <div className="title"> 
                                <h2> {review.title} </h2>
                            </div>
                        </div>

                        <div className="review-author-rating">
                            <h4>Author: {review.author}</h4>
                            <h4>Rating: {review.rating}/5</h4>
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