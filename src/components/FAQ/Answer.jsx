import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../../styles/FAQStyle/Answer.css";

const Server_IP = process.env.REACT_APP_Local_Server_IP;

const Answer = () => {
  const { id } = useParams(); // URL에서 질문 ID 가져오기
  const [answer, setAnswer] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [error, setError] = useState('');

  const fetchAnswer = () => {
    axios.get(`${Server_IP}/answer/question/${id}`)
      .then(response => {
        setAnswer(response.data);
        setNewAnswer(response.data.answer); // 이미 존재하는 답변이 있으면 입력 필드에 표시
        setError(''); // Clear any previous errors
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          setAnswer(null);
        } else {
          console.error('Error fetching answer:', error);
          setError('Error fetching answer.');
        }
      });
  };

  useEffect(() => {
    fetchAnswer();
  }, [id]);

  const handleAnswerSubmit = (event) => {
    event.preventDefault();
    axios.post(`${Server_IP}/answer`, { question_id: id, answer: newAnswer })
      .then(response => {
        setAnswer(response.data);
        setNewAnswer(response.data.answer); // 새로 제출한 답변을 입력 필드에 표시
        setError(''); // Clear any previous errors
      })
      .catch(error => {
        console.error('Error posting answer:', error);
        setError('Error posting answer.');
      });
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="answer-detail">
      <h2>Answer</h2>
      {error && <p className="error-message">{error}</p>}
      {answer && (
        <div className="answer-item">
          <p>{answer.answer}</p>
          <p className="date">{formatDate(answer.created_at)}</p>
          <p>{answer.responder}</p>
        </div>
      )}

      <form onSubmit={handleAnswerSubmit} className="answer-form">
        <h3>Submit your answer</h3>
        <textarea
            type="text"
            id="answer"
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Answer;
