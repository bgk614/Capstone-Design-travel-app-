import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import "../../styles/BoardStyle/BoardList.css";

const BoardList = () => {
  const [boardList, setBoardList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/board/')
      .then(response => {
        setBoardList(response.data.boards);  // 'boards' 키로 접근
      })
      .catch(error => {
        console.error('Error fetching boards:', error);
      });
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="board-list">
      <h1>게시판 목록</h1>
      {boardList.map((board, index) => (
        <div key={index} className="board-item">
          <Link to={`/board/${board.idx}`}>
            <h2>{board.title}</h2>
          </Link>
          <p>{board.contents}</p>
          <p>{board.created_by}</p>
          <p className="date">{formatDate(board.created_at)}</p>
        </div>
      ))}
    </div>
  );
};

export default BoardList;