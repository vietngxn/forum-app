import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

function CommentList({ postId }) {
    const [comments, setComments] = useState([]);
    
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'posts', postId, 'comments'), (querySnapshot) => {
            const commentsArray = [];
            querySnapshot.forEach((doc) => {
                commentsArray.push({ ...doc.data(), id: doc.id });
            });
            setComments(commentsArray);
        });
        return () => unsubscribe();
    }, [postId]);

    return (
        <div>
            <h4>Comments</h4>
            {comments.map(comment => (
                <div key={comment.id}>
                    <p>{comment.text}</p>
                    <p>Posted by: {comment.author}</p>
                </div>
            ))}
        </div>
    );
}

export default CommentList;
