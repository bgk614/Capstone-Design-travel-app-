import React, { useState, useEffect } from 'react';
import "../../styles/CityNavStyle/CityNavVertical.css";

//여행지 정보를 가져오는 API 함수
const fetchBestDestinations = (city) => {
  // 이 함수는 도시 이름을 바탕으로 해당 도시의 베스트 여행지 정보를 가져오는 로직을 포함해야 합니다.
  // 여기에는 예시를 위한 정적 데이터를 사용합니다.
  const destinations = {
    천안시: ['독립기념관', '각원사', '아라리오 갤러리'],
    공주시: ['리스트'],
  };
  return destinations[city] || [];
};

const CityNavVertical = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [bestDestinations, setBestDestinations] = useState([]);

  useEffect(() => {
    if (selectedCity) {
      const destinations = fetchBestDestinations(selectedCity);
      setBestDestinations(destinations);
    }
  }, [selectedCity]);

  const cities = [
    '충청남도', '천안시', '공주시', '보령시', 
    '아산시', '서산시', '논산시', '계룡시', 
    '당진시', '금산군', '부여군', '서천군', 
    '청양군', '홍성군', '예산군', '태안군',
  ];

  return (
    <div>
    <div className='city-nav-vertical'>
      <ul>
        {cities.map((city, index) => (
          <li key={index} onClick={() => setSelectedCity(city)}>
            <div className='city-vertical'>
              {city}
            </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default CityNavVertical;