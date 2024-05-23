import React, { useState, useEffect } from "react";
import axios from 'axios';
// import '../../styles/PageStyle/MyPageStyle/MyTravelPreferencesPage.css';

export default function MyTravelPreference() {
    const [preferences, setPreferences] = useState([]);
    const [travelInfo, setTravelInfo] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/travel/preferences')
            .then(response => setPreferences(response.data))
            .catch(error => console.error("Error fetching travel preferences", error));
        axios.get('http://localhost:8080/api/travel/info')
            .then(response => setTravelInfo(response.data))
            .catch(error => console.error("Error fetching travel information", error));
    }, []);

    return (
        <div className="my-travel-preferences">
            <h1>나의 여행 성향</h1>
            <section>
                <h2>여행 성향</h2>
                {preferences.length ? (
                    <ul>{preferences.map(pref => <li key={pref.id}>{pref.type}: {pref.description}</li>)}</ul>
                ) : <p>존재하지 않습니다.</p>}
            </section>
            <section>
                <h2>여행정보</h2>
                {travelInfo.length ? (
                    <ul>{travelInfo.map(info => <li key={info.id}>{info.destination}: {info.details}</li>)}</ul>
                ) : <p>존재하지 않습니다.</p>}
            </section>
        </div>
    );
}
