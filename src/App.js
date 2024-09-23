import React, { useEffect, useState } from 'react';
import Auth from './components/Auth';
import CreatePost from './components/CreatePost';
import PostList from './components/PostList';
import { auth } from './firebase';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    return (
        <div>
            <h1>Forum</h1>
            <Auth />
            {user && <CreatePost />}
            <PostList />
        </div>
    );
}

export default App;
