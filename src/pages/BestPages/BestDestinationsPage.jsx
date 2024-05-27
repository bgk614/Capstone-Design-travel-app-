import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BestNav from '../../components/Best/BestNav';
import "../../styles/BestStyle/Best.css";
import CityNavHorizontal from '../../components/CityNav/CityNavHorizontal';

function BestDestinationsPage() {
    const [destinations, setDestinations] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/tours/')
            .then(response => {
                setDestinations(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    const handleClick = (id) => {
        axios.post(`http://localhost:8000/tours/${id}/click`)
            .then(response => {
                setDestinations(prevDestinations => prevDestinations.map(destination => 
                    destination.id === id ? { ...destination, clicks: destination.clicks + 1 } : destination
                ));
            })
            .catch(error => {
                console.error('There was an error updating the click count!', error);
            });
    };
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
                        <Link to={`/tours/${destination.id}`} key={destination.id} className='best-d-1' onClick={() => handleClick(destination.id)}>
                            {destination.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BestDestinationsPage;
