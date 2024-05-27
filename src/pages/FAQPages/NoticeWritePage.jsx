import React from 'react';
import NoticeWrite from '../../components/FAQ/NoticeWrite';
import { Link } from "react-router-dom";
// import "../../styles/PageStyle/WritePageStyle.css"

function NoticeWritePage() {
  return (
    <div>
      공지추가
      <NoticeWrite/>
      <Link to="/faq">취소</Link> 
    </div>
  )
}

export default NoticeWritePage;
