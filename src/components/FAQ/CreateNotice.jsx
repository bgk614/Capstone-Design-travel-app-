import React from 'react';
import { useNavigate } from 'react-router-dom';
// import "../../styles/PageStyle/WritePageStyle.css";

function CreateNotice() {
  // useNavigate 훅을 사용하여 페이지 네비게이션 기능 사용
  const navigate = useNavigate();

  // 폼 제출 핸들러 함수
  const handleSubmit = (event) => {
    event.preventDefault();  // 폼 기본 제출 동작 방지

    // 폼 필드 값 가져오기
    const title = event.target.title.value;
    const content = event.target.content.value;

    // 콘솔 로그와 알림을 통해 제출된 데이터 확인
    console.log('Submitting:', title, content);
    alert(`Submitted:\nTitle: ${title}\nContent: ${content}`);

    // 폼 제출 후 '/FAQPage'로 리디렉션
    navigate('/FAQPage'); 

    // 폼 제출 후 입력 필드 초기화
    event.target.reset();
  };

  return (
    <div className="post-form-container">
      {/* 폼 제출 시 handleSubmit 함수 호출 */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          {/* 제목 입력 필드 */}
          <label htmlFor="title">제목:</label>
          <input type="text" id="title" name="title" required />
        </div>
        <div className="form-group">
          {/* 내용 입력 필드 */}
          <label htmlFor="content">내용:</label>
          <textarea id="content" name="content" required></textarea>
        </div>
        {/* 제출 버튼 */}
        <button type="submit" className="submit-button">Submit Post</button>
      </form>
    </div>
  );
}

export default CreateNotice;
