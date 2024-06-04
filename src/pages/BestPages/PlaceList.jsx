// src/components/PlaceList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PlaceList = () => {
    const [places, setPlaces] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/place/all')
            .then(response => {
                setPlaces(response.data);
            })
            .catch(error => {
                setError(error);
            });
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h1>All Places</h1>
            {places.length === 0 ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {places.map(place => (
                        <li key={place.id}>
                            <Link to={`/place/${place.contentId}`}>{place.title}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PlaceList;
