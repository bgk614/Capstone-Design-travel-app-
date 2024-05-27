import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/PageStyle/WritePageStyle.css";
import axios from 'axios';

const Server_IP = process.env.REACT_APP_Local_Server_IP;

const QuestionWrite = () => {
  const [title, setTitle] = useState('');
  const [question, setQuestion] = useState('');
  const [asker, setAsker] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newQuestion = {
      title,
      question,
      asker,
    };

    try {
      await axios.post(`${Server_IP}/question`, newQuestion);
      alert('문의글이 성공적으로 작성되었습니다.');
      navigate('/faq'); // 문의글 목록 페이지로 이동
    } catch (error) {
      console.error('문의글 작성 중 오류 발생:', error);
      alert('문의글 작성 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="question-write">
      <h1>문의글 작성</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="question">내용</label>
          <textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="asker">작성자</label>
          <input
            type="text"
            id="asker"
            value={asker}
            onChange={(e) => setAsker(e.target.value)}
            required
          />
        </div>
        <button type="submit">작성하기</button>
      </form>
    </div>
  );
};

export default QuestionWrite;
