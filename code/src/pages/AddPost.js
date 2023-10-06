import React, { useEffect, useState } from "react";
import { addDoc, collection } from 'firebase/firestore'
import './AddPost.css'
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function AddPost(isAuth) {
    let navigate = useNavigate();
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

    const isValidTitle = (titleValue) => {
        if (titleValue.length <= 0) {
            return "Title should not be empty.";
        }
        return "";
    };

    const isValidRating = (value) => {
        const ratingValue = parseFloat(value);
        if (isNaN(ratingValue) || ratingValue < 0 || ratingValue > 5) {
            return "Please enter a valid rating between 0 and 5.";
        }
        return "";
    };

    const isValidReview = (reviewValue) => {
        if (reviewValue.length <= 0) {
            return "Review should not be empty.";
        }
        return "";
    };

    const handleTitleChange = (e) => {
        const value = e.target.value;

        setFormErrors(errors => ({
            ...errors,
            title: isValidTitle(value)
        }));

        setTitle(value);
    };
    
    const handleRatingChange = (e) => {
        const value = e.target.value;

        setFormErrors(errors => ({
            ...errors,
            rating: isValidRating(value)
        }));

        setRating(value);
    };

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

    const reviewsCollectionRef = collection(db, "reviews");
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
            {formErrors.title && <p className="error-text">{formErrors.title}</p> || formErrors.rating && <p className="error-text">{formErrors.rating}</p> || formErrors.review && <p className="error-text">{formErrors.review}</p>}  
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
            <button onClick={createReview}> Submit My Review</button>
        </div>
    );
}

export default AddPost;