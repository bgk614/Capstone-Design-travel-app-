import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BestNav from '../../components/Best/BestNav';
import "../../styles/BestStyle/Best.css";

function TourDetailPage() {
    const { id } = useParams();
    const [tour, setTour] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8000/tours/${id}`)
            .then(response => {
                setTour(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, [id]);

    if (!tour) {
        return <div>Loading...</div>;
    }

    return (
        <div className='allpage'>
            <BestNav />
            <div className='best-page'>
                <div className="best-head-text">
                    {tour.name}
                </div>
                <div className='tour-details'>
                    <p>Address: {tour.address}</p>
                    <p>Description: {tour.description}</p>
                    <img src={tour.image} alt={tour.name} />
                </div>
            </div>
        </div>
    );
}

export default TourDetailPage;
