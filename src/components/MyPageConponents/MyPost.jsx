import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import '../../styles/PageStyle/MyPageStyle/MyPost.css'; 

export default function MyPost() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/posts/my-posts')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => console.error("Error fetching posts", error));
    }, []);

    const handleDelete = (postId) => {
        axios.delete(`http://localhost:8080/api/posts/${postId}`)
            .then(() => {
                setPosts(posts.filter(post => post.id !== postId));
                alert('Post deleted successfully');
            })
            .catch(error => console.error("Error deleting post", error));
    };

    return (
        <div className="my-post">
            <div className="my-post-head">내 게시글 ({posts.length})</div>
            {posts.length > 0 ? (
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}>
                            <h2><Link to={`/posts/${post.id}`}>{post.title}</Link></h2>
                            <p>{post.content}</p>
                            <small>Posted on: {new Date(post.createdAt).toLocaleDateString()}</small>
                            <div>
                                <button onClick={() => handleDelete(post.id)}>Delete</button>
                                <Link to={`/edit-post/${post.id}`}>Edit</Link>
                            </div>
                            <div>
                                <small>Likes: {post.likes}</small>
                                <small>Views: {post.views}</small>
                                <small>Comments: {post.comments}</small>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>게시글이 없습니다.</p>
            )}
        </div>
    );
}
