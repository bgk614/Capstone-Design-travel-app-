import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BestNav from '../../components/Best/BestNav';
import "../../styles/BestStyle/Best.css";

function BestDestinationsPage() {
    const [board, setBoard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/board')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // 데이터를 클릭 수에 따라 내림차순으로 정렬
                const sortedBoards = data.boards.sort((a, b) => b.click_count - a.click_count);
                setBoard(sortedBoards);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching popular boards:', error);
                setError(error);
                setLoading(false);
            });
    }, []);

    // const handleTitleClick = async (boardId) => {
    //     try {
    //         await axios.post(`http://localhost:8000/board/${boardId}/click`);
    //         // 클릭 성공 후 상태 업데이트
    //         setBoard(board.map(board => {
    //             if (board.id === boardId) {
    //                 return {...board, click_count: board.click_count + 1};
    //             }
    //             return board;
    //         }));
    //     } catch (error) {
    //         console.error('Error incrementing click count:', error);
    //     }
    // };
    const handleTitleClick = async (boardId) => {
        try {
            const response = await axios.post(`http://localhost:8000/board/${boardId}/click`);
            if (response.status === 200) {
                setBoard(prevBoards => prevBoards.map(item => {
                    if (item.id === boardId) {
                        return {...item, click_count: item.click_count + 1};
                    }
                    return item;
                }));
            }
        } catch (error) {
            console.error('Error incrementing click count:', error);
        }
    };
    

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
                <div className="best-head-text">게시글</div>
                <div className='board-list'>
                    {board.map((board) => (
                        <div key={board.id} className='board-item'>
                            <Link to={`/detail/${board.id}`}>
                            <h2 onClick={() => handleTitleClick(board.id)}>{board.title}</h2>
                            </Link>
                            <p>{board.click_count} clicks</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BestDestinationsPage;
