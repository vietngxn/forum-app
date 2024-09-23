import React, { useState } from 'react';
import { db } from '../firebase';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { auth } from '../firebase';

function CreatePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = auth.currentUser;

        if (!user) {
            alert("Please login to post.");
            return;
        }

        try {
            await addDoc(collection(db, 'posts'), {
                title,
                content,
                author: user.email,
                createdAt: Timestamp.now(),
                likes: 0 // Thêm trường likes
            });
            alert("Post created successfully!");
            setTitle('');
            setContent('');
        } catch (error) {
            console.error("Error creating post: ", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create New Post</h2>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            ></textarea>
            <button type="submit">Post</button>
        </form>
    );
}

export default CreatePost;
