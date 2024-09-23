import React, { useState } from 'react';
import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { auth } from '../firebase';

function CreateComment({ postId }) {
    const [comment, setComment] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = auth.currentUser;

        if (!user) {
            alert("Please login to comment.");
            return;
        }

        try {
            await addDoc(collection(db, 'posts', postId, 'comments'), {
                text: comment,
                author: user.email,
            });
            alert("Comment added!");
            setComment('');
        } catch (error) {
            console.error("Error adding comment: ", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Add a comment..." value={comment} onChange={(e) => setComment(e.target.value)} required />
            <button type="submit">Comment</button>
        </form>
    );
}

export default CreateComment;
