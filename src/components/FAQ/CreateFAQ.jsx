import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/PageStyle/WritePageStyle.css"

function CreateFAQ() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const content = event.target.content.value;

    console.log('Submitting:', title, content);
    alert(`Submitted:\nTitle: ${title}\nContent: ${content}`);

    // 폼 제출 후 원하는 페이지로 리디렉션
    navigate('/FAQPage'); 

    // 폼 제출 후 입력 필드 초기화
    event.target.reset();
  };

  return (
    <div className="post-form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">제목:</label>
          <input type="text" id="title" name="title" required />
        </div>
        <div className="form-group">
          <label htmlFor="content">내용:</label>
          <textarea id="content" name="content" required></textarea>
        </div>
        <button type="submit" className="submit-button">Submit Post</button>
      </form>
    </div>
  );
}

export default CreateFAQ;
