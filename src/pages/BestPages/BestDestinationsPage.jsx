import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BestNav from '../../components/Best/BestNav';
import "../../styles/BestStyle/Best.css";
import CityNavHorizontal from '../../components/CityNav/CityNavHorizontal';

function BestDestinationsPage() {
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/places/all')
            .then(response => {
                setDestinations(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className='allpage'>
            <BestNav />
            <div className='best-page'>
                <div className="best-head-text">
                    여행지
                </div>
                <CityNavHorizontal />
                <div>베스트 여행지 50개</div>
                <div className='best-d-list'>
                    {destinations.map(destination => (
                        <Link to={`/tours/${destination.id}`} key={destination.id} className='best-d-1'>
                            {destination.title}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BestDestinationsPage;
