import React from 'react';
import { Link } from 'react-router-dom';
import CreateFAQ from '../../components/FAQ/CreateFAQ';
import "../../styles/PageStyle/WritePageStyle.css"

function CreateFAQPage() {
  return (
    <div>
      문의글 쓰기
      <CreateFAQ/>
      <Link to="/faq">취소</Link> 
    </div>
  )
}
export default CreateFAQPage;
