import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from 'firebase/firestore'
import { db, auth } from "../firebase";
import './AddPost.css'

function AddPost(isAuth) {
    let navigate = useNavigate(); // Hook that is used to redirect user to the corresponding page.

    // Captures and allow modification to the state of these variables used in this function.
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [rating, setRating] = useState("");
    const [review, setReview] = useState("");
    const [formErrors, setFormErrors] = useState({
        title: "",
        author: "",
        rating: "",
        review: ""
    });

    // Ensures title field is not empty
    const isValidTitle = (titleValue) => {
        if (titleValue.length <= 0) {
            return "Title should not be empty.";
        }
        return "";
    };

    // Ensures rating is between 0 and 5
    const isValidRating = (value) => {
        const ratingValue = parseFloat(value);
        if (isNaN(ratingValue) || ratingValue < 0 || ratingValue > 5) {
            return "Please enter a valid rating between 0 and 5.";
        }
        return "";
    };

    // Ensures there is review being written
    const isValidReview = (reviewValue) => {
        if (reviewValue.length <= 0) {
            return "Review should not be empty.";
        }
        return "";
    };

    // Triggers when user types in the title field
    // Validates the input
    // Capture the input if valid
    const handleTitleChange = (e) => {
        const value = e.target.value;

        setFormErrors(errors => ({
            ...errors,
            title: isValidTitle(value)
        }));

        setTitle(value);
    };
    
    // Triggers when user types in the rating field
    // Validates the input
    // Capture the input if valid
    const handleRatingChange = (e) => {
        const value = e.target.value;

        setFormErrors(errors => ({
            ...errors,
            rating: isValidRating(value)
        }));

        setRating(value);
    };

    // Triggers when user types in the review field
    // Validates the input
    // Capture the input if valid
    const handleReviewChange = (e) => {
        const value = e.target.value;

        setFormErrors(errors => ({
            ...errors,
            review: isValidReview(value)
        }));

        setReview(value);
    };


    // Guard function (additional security measure)
    // Redirect user to login page if not authenticated
    // Checks immediately when this component is rendered
    useEffect(() => {
        if (!isAuth) {
            navigate("/login")
        }
    })

    // The database reference in the firebase console that stores all the data
    const reviewsCollectionRef = collection(db, "reviews");

    // Checks for validity of the inputs
    // Saves the data into the database if all inputs are valid
    const createReview = async () => {
        // Check if there are any errors in the formErrors object
        const errorValues = Object.values(formErrors);
        const hasError = errorValues.some(errorMsg => errorMsg !== "");
        const hasInvalidParam = title.length <= 0 || review.length <= 0 || (rating < 0 || rating > 5)
        if (hasError || hasInvalidParam) {
            return;
        }
        
        const currentDate = new Date();

        const createdByName = auth.currentUser.displayName;
        const createdById = auth.currentUser.uid;
        let createdByObject = {
            name: createdByName, 
            id: createdById
        }
        
        let data = {
            title: title,
            author: author,
            rating: rating,
            review: review,
            createdBy: createdByObject,
            dateCreated: currentDate
        }


        // Arg 1: reference to the database collection (i.e. "table") you want to the info add to
        // Arg 2: Data that should be added
        await addDoc(reviewsCollectionRef, data);
        navigate("/") 
    }

    return (  
        <div className="add-post-page">
            <h1>Create a Review!</h1>
            {(formErrors.title && <p className="error-text">{formErrors.title}</p>) || (formErrors.rating && <p className="error-text">{formErrors.rating}</p>) || (formErrors.review && <p className="error-text">{formErrors.review}</p>)}  
            <div className="input-field">
                <label>Book Title: </label>
                <input placeholder="Title" onChange={handleTitleChange} className={formErrors.title ? "error-input" : ""}></input>
            </div>
            <div className="input-field">
                <label>Author: </label>
                <input placeholder="Author" onChange={(e) => setAuthor(e.target.value)} ></input>
            </div>
            <div className="input-field">
                <label>Rating: </label>
                <input placeholder="out of 5" onChange={handleRatingChange} className={formErrors.rating ? "error-input" : ""}></input>
            </div>
            <div className="input-field">
                <label>Review: </label>
                <textarea placeholder="Write your thoughts here..." onChange={handleReviewChange} className={formErrors.review ? "error-input" : ""}></textarea>
            </div>
            <button onClick={createReview}>Post Review</button>
        </div>
    );
}

export default AddPost;