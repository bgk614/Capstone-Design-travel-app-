import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CityNavVertical from '../../components/CityNav/CityNavVertical';
import DestinationCategoryBar from "../../components/CityNav/DestinationCategoryBar";
import "../../styles/PageStyle/DestinationsPage.css";

export default function DestinationsPage() {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/place/all')
            .then(response => {
                if (!response.ok) {
                    throw new Error('???????????????');
                }
                return response.json();
            })
            .then(data => {
                setPlaces(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching places:', error);
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
        <div className="diva">
            <div className="des-left-page">
                <div className="des-text"> 지역 </div>
                 <CityNavVertical onSelectCity={setSelectedCity} />
            </div>
            
            <div className="des-center-page">
                <div className="d-text"> 여행지 </div>
                <DestinationCategoryBar />
                <div className='d-list'>
                    <div className="d-3">
                        {filteredPlaces.map(place => (
                            <div key={place.id} className="d-list">
                                <Link to={`/place/${place.contentId}`}>{place.title}</Link>
                            </div>
                        ))}
                    </div>
                </div>
                <br></br>
            </div>
        </div>
    )
}
