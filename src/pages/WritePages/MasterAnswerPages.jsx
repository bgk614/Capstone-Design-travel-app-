import React, { useState } from "react";

function MasterAnswerPage() {
  // 상태 변수를 사용하여 제목과 내용을 관리합니다.
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 제출 핸들러 함수
  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 제출 동작 방지

    // 제목과 내용을 서버로 전송하거나 다른 작업을 수행할 수 있습니다.
    console.log("제목:", title);
    console.log("내용:", content);

    // 제출 후 입력 내용 초기화
    setTitle("");
    setContent("");
  };

  return (
    <div>
      <h2>게시글 작성</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">제목:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">내용:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">제출</button>
      </form>
    </div>
  );
}

export default PostForm;
