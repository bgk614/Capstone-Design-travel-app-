import React from "react";
import "../../styles/CityNavStyle/CityNavVertical.css";

const CityNavVertical = ({ onSelectCity }) => {
    const cities = [
        { name: "천안시", code: 12 },
        { name: "공주시", code: 1 },
        { name: "보령시", code: 5 },
        { name: "아산시", code: 9 },
        { name: "서산시", code: 7 },
        { name: "논산시", code: 3 },
        { name: "계룡시", code: 16 },
        { name: "당진시", code: 4 },
        { name: "금산군", code: 2 },
        { name: "부여군", code: 6 },
        { name: "서천군", code: 8 },
        { name: "청양군", code: 13 },
        { name: "홍성군", code: 15 },
        { name: "예산군", code: 11 },
        { name: "태안군", code: 14 },
    ];

    return (
        <div className="city-nav-vertical">
            <ul>
                {cities.map((city, index) => (
                    <li key={index} onClick={() => { 
                        console.log(`Selected city: ${city.code}`);  // 디버깅 로그 추가
                        onSelectCity(city.code); 
                    }}>
                        <div className="city-vertical">{city.name}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CityNavVertical;