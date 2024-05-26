import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../../styles/BoardStyle/BoardDetail.css";

const Server_IP = process.env.REACT_APP_Local_Server_IP;

const BoardDetail = () => {
  const { id } = useParams(); // URL에서 게시글 ID 가져오기
  const [board, setBoard] = useState(null);

  useEffect(() => {
    console.log(`Fetching board details from ${Server_IP}/board/${id}`);
    axios.get(`${Server_IP}/board/${id}`)
      .then(response => {
        setBoard(response.data); // 응답 데이터를 상태에 저장
      })
      .catch(error => {
        console.error('Error fetching board:', error);
      });
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (!board) return <div>Loading...</div>;

  return (
    <div className="board-detail">
      <h1>{board.title}</h1>
      <p>{board.contents}</p>
      <p>{board.created_by}</p>
      <p className="date">{formatDate(board.created_at)}</p>
    </div>
  );
};

export default BoardDetail;
