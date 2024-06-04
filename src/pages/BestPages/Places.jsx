import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Places = () => {
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const response = await axios.get('http://localhost:8000/place'); // 백엔드 엔드포인트
                setPlaces(response.data);
            } catch (error) {
                console.error('Error fetching places:', error);
            }
        };

        fetchPlaces();
    }, []);

    return (
        <div>
            <h1>Places</h1>
            <ul>
                {places.map((place) => (
                    <li key={place.id}>
                        <h2>{place.title}</h2>
                        <p>{place.addr1} {place.addr2}</p>
                        <img src={place.firstimage} alt={place.id} />
                        <p>{place.tel}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Places;
