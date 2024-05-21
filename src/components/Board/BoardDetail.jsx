import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// import "../../styles/BoardStyle/BoardDetail.css";

const BoardDetail = () => {
  const { id } = useParams();
  const [board, setBoard] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/board/${id}`)
      .then(response => {
        setBoard(response.data);
      })
      .catch(error => {
        console.error('Error fetching board:', error);
      });
  }, [id]);

  if (!board) return <div>Loading...</div>;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

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