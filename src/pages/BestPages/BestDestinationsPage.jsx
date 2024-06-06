import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BestNav from '../../components/Best/BestNav';
import CityNavHorizontal from '../../components/CityNav/CityNavHorizontal';
import "../../styles/BestStyle/Best.css";

function BestDestinationsPage() {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/place/all')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch best places');
                }
                return response.json();
            })
            .then(data => {
                setPlaces(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching best places:', error);
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

    const filteredPlaces = selectedCity ? places.filter(place => place.sigunguCode === selectedCity) : places;

    return (
        <div className='allpage'>
            <BestNav />
            <div className='best-page'>
                <div className="best-head-text">
                    여행지
                </div>
                <CityNavHorizontal onSelectCity={setSelectedCity} />
                <div>베스트 여행지 50개</div>
                <div className='best-d-list'>
                    {filteredPlaces.map(place => (
                        <div key={place.id} className='best-d-1'>
                            {place.firstimage && <img src={place.firstimage} alt={place.title} />}
                            <Link to={`/place/${place.contentId}`}>{place.title}</Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BestDestinationsPage;

