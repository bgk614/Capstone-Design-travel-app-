import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../../styles/FAQStyle/QuestionDetail.css";

const Server_IP = process.env.REACT_APP_Local_Server_IP;

const QuestionDetail = () => {
  const { id } = useParams(); // URL에서 게시글 ID 가져오기
  const [question, setquestion] = useState(null);

  useEffect(() => {
    console.log(`Fetching question details from ${Server_IP}/question/${id}`);
    axios.get(`${Server_IP}/question/${id}`)
      .then(response => {
        setquestion(response.data); // 응답 데이터를 상태에 저장
      })
      .catch(error => {
        console.error('Error fetching question:', error);
      });
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (!question) return <div>Loading...</div>;

  return (
    <div className="question-detail">
      <h1>{question.title}</h1>
      <p>{question.question}</p>
      <p className="date">{formatDate(question.created_at)}</p>
    </div>
  );
};

export default QuestionDetail;
