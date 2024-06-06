// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from "axios";
// import BestNav from '../../components/Best/BestNav';
// import "../../styles/BestStyle/Best.css"
// import CityNavHorizontal from '../../components/CityNav/CityNavHorizontal';

// const Server_IP = process.env.REACT_APP_Local_Server_IP;

// const BoardList = () => {
//   const [boardList, setBoardList] = useState([]);

//   useEffect(() => {
//     console.log(`Fetching board list from ${Server_IP}/board`);
//     axios.get(`${Server_IP}/board`)
//       .then(response => {
//         setBoardList(response.data.boards);  // 'boards' 키로 접근
//       })
//       .catch(error => {
//         console.error('Error fetching boards:', error);
//       });
//   }, []);

//   const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };
//   return (
//     <div className='allpage'>
//         <BestNav />
//         <div className='best-page'>
//             <div className="best-head-text">
//                 게시글
//             </div>
//             <CityNavHorizontal />
//             <div className='board-list'>
//             {boardList.map((board, index) => (
//             <div key={index} className="board-item">
//             <Link to={`/board/${board.id}`}>
//                 <h2>{board.title}</h2>
//             </Link>
//             {/* <p>{board.contents}</p>
//             <p>{board.created_by}</p>
//             <p className="date">{formatDate(board.created_at)}</p> */}
//             </div>
//                 ))}
//             </div>
//         </div>
//     </div>
//   );
// };

// export default BoardList;



import React, { useEffect, useState } from 'react';
//import { Link } from "react-router-dom"
import BestNav from '../../components/Best/BestNav';
import "../../styles/BestStyle/Best.css"
import CityNavHorizontal from '../../components/CityNav/CityNavHorizontal';

function BestDestinationsPage() {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // FastAPI 엔드포인트에서 인기 게시글 데이터를 가져옵니다.
        fetch('http://localhost:8000/board')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setBoards(data.boards);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching popular boards:', error);
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
                    게시글
                </div>
                <CityNavHorizontal />
                <div className='board-list'>
                    {boards.map((board) => (
                        <div key={board.id} className='board-item'>
                            <h3>{board.title}</h3>
                            <p>{board.click_count} clicks</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BestDestinationsPage;
