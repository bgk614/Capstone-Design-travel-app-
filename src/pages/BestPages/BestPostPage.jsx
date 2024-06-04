import React, { useEffect, useState } from 'react';
//import { Link } from "react-router-dom"
import BestNav from '../../components/Best/BestNav';
import "../../styles/BestStyle/Best.css"
//import CityNavHorizontal from '../../components/CityNav/CityNavHorizontal';

function BestDestinationsPage() {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // FastAPI 엔드포인트에서 인기 게시글 데이터를 가져옵니다.
        fetch('http://localhost:8000/popular')
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
                <div>글쓰기</div>
                <div>베스트 글 50개</div>
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
