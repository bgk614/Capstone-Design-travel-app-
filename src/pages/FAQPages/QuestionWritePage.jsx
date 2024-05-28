import React from 'react';
import { Link } from 'react-router-dom';
// import "../../styles/PageStyle/WritePageStyle.css"
import QuestionWrite from '../../components/FAQ/QuestionWrite';

function QuestionWritePage() {
  return (
    <div>
      문의글 쓰기
      <QuestionWrite/>
      <Link to="/faq">취소</Link> 
    </div>
  )
}
export default QuestionWritePage;
