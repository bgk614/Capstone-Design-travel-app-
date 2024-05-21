import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../../styles/BoardStyle/BoardWrite.css"

const BoardWrite = () => {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBoard = {
      title,
      contents,
      created_by: createdBy,
    };

    try {
      await axios.post('http://localhost:8000/board/', newBoard);
      alert('게시글이 성공적으로 작성되었습니다.');
      navigate('/board'); // 게시글 목록 페이지로 이동
    } catch (error) {
      console.error('게시글 작성 중 오류 발생:', error);
      alert('게시글 작성 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="board-write">
      <h1>게시글 작성</h1>
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
          <label htmlFor="contents">내용</label>
          <textarea
            id="contents"
            value={contents}
            onChange={(e) => setContents(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="createdBy">작성자</label>
          <input
            type="text"
            id="createdBy"
            value={createdBy}
            onChange={(e) => setCreatedBy(e.target.value)}
            required
          />
        </div>
        <button type="submit">작성하기</button>
      </form>
    </div>
  );
};

export default BoardWrite;