import React from "react";
import "../../styles/CityNavStyle/CityNavHorizontal.css";

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
        <div className="city-nav-horizontal">
            <ul>
                {cities.map((city, index) => (
                    <li key={index} onClick={() => { 
                        console.log(`Selected city: ${city.code}`);  // 디버깅 로그 추가
                        onSelectCity(city.code); 
                    }}>
                        <div className="city-horizontal">{city.name}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CityNavVertical;
// import React, { useState, useEffect } from 'react';
// import "../../styles/CityNavStyle/CityNavHorizontal.css";
// //여행지 정보를 가져오는 API 함수
// const fetchBestDestinations = (city) => {
//   // 이 함수는 도시 이름을 바탕으로 해당 도시의 베스트 여행지 정보를 가져오는 로직을 포함해야 합니다.
//   // 여기에는 예시를 위한 정적 데이터를 사용합니다.
//   const destinations = {
//     천안시: ['독립기념관', '각원사', '아라리오 갤러리', '유관순열사 기념관', '성성호수공원', '천호지', '...'],
//     공주시: ['리스트'],
//   };
//   return destinations[city] || [];
// };

// const CityNavHorizontal = () => {
//   const [selectedCity, setSelectedCity] = useState('');
//   const [bestDestinations, setBestDestinations] = useState([]);

//   useEffect(() => {
//     if (selectedCity) {
//       const destinations = fetchBestDestinations(selectedCity);
//       setBestDestinations(destinations);
//     }
//   }, [selectedCity]);

//   const cities = [
//     { name: "천안시", code: 1 },
//     { name: "공주시", code: 2 },
//     { name: "보령시", code: 3 },
//     { name: "아산시", code: 4 },
//     { name: "서산시", code: 5 },
//     { name: "논산시", code: 6 },
//     { name: "계룡시", code: 7 },
//     { name: "당진시", code: 8 },
//     { name: "금산군", code: 9 },
//     { name: "부여군", code: 10 },
//     { name: "서천군", code: 11 },
//     { name: "청양군", code: 12 },
//     { name: "홍성군", code: 13 },
//     { name: "예산군", code: 14 },
//     { name: "태안군", code: 15 },
// ];

//   return (
//     <div>
//     <div className='city-nav-horizontal'>
//       <ul>
//         {cities.map((city, index) => (
//           <li key={index} onClick={() => setSelectedCity(city)}>
//             <div className='city-horizontal'>
//               {city.name}
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//       <div className='bestdestinations-list-horizontal'>
//         {selectedCity && (
//           <div>
//             {selectedCity} 
//             베스트 50
//             <ul>
//               {bestDestinations.map((destination, index) => (
//               <li key={index}>{destination}</li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CityNavHorizontal;