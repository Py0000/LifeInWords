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

    // Guard function (additional security measure)
    // Redirect user to login page if not authenticated
    useEffect(() => {
        if (!isAuth) {
            navigate("/login")
        }
    })

    const reviewsCollectionRef = collection(db, "reviews");
    const createReview = async () => {
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
            createdBy: createdByObject
        }

        // Arg 1: reference to the database collection (i.e. "table") you want to the info add to
        // Arg 2: Data that should be added
        await addDoc(reviewsCollectionRef, data);
        navigate("/") 
    }

    return (  
        <div className="add-post-page">
            <h1>Create a Review!</h1>
            <div className="input-field">
                <label>Book Title: </label>
                <input placeholder="Title" onChange={(e) => setTitle(e.target.value)}></input>
            </div>
            <div className="input-field">
                <label>Author: </label>
                <input placeholder="Author" onChange={(e) => setAuthor(e.target.value)}></input>
            </div>
            <div className="input-field">
                <label>Rating: </label>
                <input placeholder="out of 5" onChange={(e) => setRating(e.target.value)}></input>
            </div>
            <div className="input-field">
                <label>Review: </label>
                <textarea placeholder="Write your thoughts here..." onChange={(e) => setReview(e.target.value)}></textarea>
            </div>
            <button onClick={createReview}> Submit My Review</button>
        </div>
    );
}

export default AddPost;