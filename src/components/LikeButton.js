import React from 'react';
import { db } from '../firebase';
import { updateDoc, doc } from 'firebase/firestore';

function LikeButton({ postId, likes }) {
    const handleLike = async () => {
        const postRef = doc(db, 'posts', postId);
        await updateDoc(postRef, {
            likes: likes + 1
        });
    };

    return (
        <div>
            <button onClick={handleLike}>Like</button>
            <p>{likes} Likes</p>
        </div>
    );
}

export default LikeButton;
