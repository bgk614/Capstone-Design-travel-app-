import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../../styles/PageStyle/MyPageStyle/MyLike.css'; 

export default function MyLike() {
    const [places, setPlaces] = useState([]);
    const [plans, setPlans] = useState([]);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/favorites/places')
            .then(response => setPlaces(response.data))
            .catch(error => console.error("Error fetching favorite places", error));
        axios.get('http://localhost:8080/api/favorites/plans')
            .then(response => setPlans(response.data))
            .catch(error => console.error("Error fetching favorite plans", error));
        axios.get('http://localhost:8080/api/favorites/posts')
            .then(response => setPosts(response.data))
            .catch(error => console.error("Error fetching favorite posts", error));
    }, []);

    return (
        <div className="my-favorites">
            <h1>책갈피</h1>
            <section>
                <h2>여행지 ({places.length})</h2>
                {places.length ? (
                    <ul>{places.map(place => <li key={place.id}>{place.name}</li>)}</ul>
                ) : <p>존재하지 않습니다.</p>}
            </section>
            <section>
                <h2>일정 ({plans.length})</h2>
                {plans.length ? (
                    <ul>{plans.map(plan => <li key={plan.id}>{plan.title}</li>)}</ul>
                ) : <p>존재하지 않습니다.</p>}
            </section>
            <section>
                <h2>게시글 ({posts.length})</h2>
                {posts.length ? (
                    <ul>{posts.map(post => <li key={post.id}>{post.title}</li>)}</ul>
                ) : <p>존재하지 않습니다.</p>}
            </section>
        </div>
    );
}
