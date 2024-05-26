import React from 'react';
import CreateNotice from '../../components/FAQ/CreateNotice';
import { Link } from "react-router-dom";
import "../../styles/PageStyle/WritePageStyle.css"

function CreateNoticePage() {
  return (
    <div>
      공지추가
      <CreateNotice/>
      <Link to="/faq">취소</Link> 
    </div>
  )
}

export default CreateNoticePage;
