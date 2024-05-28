import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../../styles/FAQStyle/NoticeDetail.css";

const Server_IP = process.env.REACT_APP_Local_Server_IP;

const NoticeDetail = () => {
  const { id } = useParams(); // URL에서 게시글 ID 가져오기
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    console.log(`Fetching notice details from ${Server_IP}/notice/${id}`);
    axios.get(`${Server_IP}/notice/${id}`)
      .then(response => {
        setNotice(response.data); // 응답 데이터를 상태에 저장
      })
      .catch(error => {
        console.error('Error fetching Notice:', error);
      });
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (!notice) return <div>Loading...</div>;

  return (
    <div className="Notice-detail">
      <h1>{notice.title}</h1>
      <p>{notice.content}</p>
      <p className="date">{formatDate(notice.created_at)}</p>
    </div>
  );
};

export default NoticeDetail;
