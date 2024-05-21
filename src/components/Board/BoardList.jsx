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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/board/${id}`);
      alert('게시글이 성공적으로 삭제되었습니다.');
      // 삭제 후 게시글 목록을 다시 불러옵니다.
      setBoardList(boardList.filter(board => board.idx !== id));
    } catch (error) {
      console.error('게시글 삭제 중 오류 발생:', error);
      alert('게시글 삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="board-list">
      <h1>게시판 목록</h1>
      {boardList.map((board, index) => (
        <div key={index} className="board-item">
          <Link to={`/detail/${board.idx}`}>
            <h2>{board.title}</h2>
          </Link>
          <p>{board.contents}</p>
          <p>{board.created_by}</p>
          <p className="date">{formatDate(board.created_at)}</p>
          <button className="board-delete-button" onClick={() => handleDelete(board.idx)}>삭제</button> {/* 삭제 버튼 추가 */}
        </div>
      ))}
    </div>
  );
};

export default BoardList;