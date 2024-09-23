import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import CommentList from './CommentList';
import CreateComment from './CreateComment';
import LikeButton from './LikeButton';

function PostList() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const postsArray = [];
            querySnapshot.forEach((doc) => {
                postsArray.push({ ...doc.data(), id: doc.id });
            });
            setPosts(postsArray);
        });
        return () => unsubscribe();
    }, []);

    return (
        <div>
            <h2>Posts</h2>
            {posts.map(post => (
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                    <p>Posted by: {post.author}</p>
                    <LikeButton postId={post.id} likes={post.likes} />
                    <CreateComment postId={post.id} />
                    <CommentList postId={post.id} />
                </div>
            ))}
        </div>
    );
}

export default PostList;
