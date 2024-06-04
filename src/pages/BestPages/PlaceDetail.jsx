import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../../styles/PageStyle/PlaceDetail.css";

const PlaceDetail = () => {
    const { content_id } = useParams();
    const [place, setPlace] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log(`Fetching data for content_id: ${content_id}`);
        axios.get(`http://localhost:8000/place/${content_id}`)
            .then(response => {
                console.log('Data fetched:', response.data);
                setPlace(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching place:', error);
                setError(error);
                setLoading(false);
            });
    }, [content_id]);

    useEffect(() => {
        console.log('Place state updated:', place);
    }, [place]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="place-detail">
            <h1>{place.title}</h1>
            <p>주소 : {place.addr1} {place.addr2}</p>
            {place.firstimage && <img src={place.firstimage} alt={place.title} />}
            <p>전화번호 : {place.tel}</p>
            {place.hmpg && <p><a href={place.hmpg} target="_blank" rel="noopener noreferrer">Website</a></p>}
            <p>추가설명</p>
            <p>{place.overview}</p>
        </div>
    );
};

export default PlaceDetail;
