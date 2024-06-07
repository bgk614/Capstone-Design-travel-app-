import React, { useState, useEffect } from 'react';
import "../../styles/CityNavStyle/DestinationCategoryBar.css"; // 필요하다면 스타일 경로를 확인하고 주석 해제

// 여행지 정보를 가져오는 API 함수
const fetchDestinations = (category) => {
  // 가정된 데이터 구조를 사용합니다. 이 부분은 실제 API 호출 로직으로 변경해야 합니다.
  const destinations = {
    // 자연: ['리스트1'],
    // 도시: ['리스트2'],
    // 나머지 카테고리에 대한 정보
  };
  return destinations[category] || [];
};

const DestinationCategoryBar = ({ selectedCategory, onCategorySelect }) => {
  const [selectedDestinationCategory, setSelectedDestinationCategory] = useState(selectedCategory);
  const [bestDestinations, setBestDestinations] = useState([]);

  const destinationCategories = [
    '자연', '도시', '힐링', '문화', '이색',
    '핫플', '체험', '쇼핑', '맛집투어'
  ];

  useEffect(() => {
    setSelectedDestinationCategory(selectedCategory);
    setBestDestinations(fetchDestinations(selectedCategory));
  }, [selectedCategory]);

  return (
    <div className='destination-category-bar'>
      <ul>
        {destinationCategories.map((category, index) => (
          <li 
            key={index} 
            onClick={() => onCategorySelect(category)}
          >
            <div className={`category ${selectedCategory === category ? 'selected' : ''}`}>
                {category}
            </div>
            
          </li>
        ))}
      </ul>
      {selectedDestinationCategory && bestDestinations.length > 0 && (
        <ul>
          {bestDestinations.map((destination, index) => (
            <li key={index}>{destination}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DestinationCategoryBar;
