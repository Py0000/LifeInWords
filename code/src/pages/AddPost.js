import React from "react";
import './AddPost.css'

function AddPost() {
    return (  
        <div className="add-post-page">
            <h1>Create a Review!</h1>
            <div className="input-field">
                <label>Book Title: </label>
                <input placeholder="Title"></input>
            </div>
            <div className="input-field">
                <label>Author: </label>
                <input placeholder="Author"></input>
            </div>
            <div className="input-field">
                <label>Rating: </label>
                <input placeholder="out of 5"></input>
            </div>
            <div className="input-field">
                <label>Review: </label>
                <textarea placeholder="Write your thoughts here..."></textarea>
            </div>
            <button> Submit My Review</button>
        </div>
    );
}

export default AddPost;