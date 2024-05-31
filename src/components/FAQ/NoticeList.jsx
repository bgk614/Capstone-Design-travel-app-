import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
// import "../../styles/FAQStyle/NoticeList.css"; // CSS 파일 임포트

const Server_IP = process.env.REACT_APP_Local_Server_IP;

const NoticeList = () => {
    const [noticeList, setNoticeList] = useState([]); // 초기 상태를 빈 배열로 설정
    const [loading, setLoading] = useState(true); // 로딩 상태 추가

    useEffect(() => {
        console.log(`Fetching notice list from ${Server_IP}/notice`);
        axios.get(`${Server_IP}/notice`)
          .then(response => {
            console.log('Fetched notices:', response.data); // 응답 데이터 로그
            setNoticeList(response.data.notices);  // 'notices' 키로 접근
            setLoading(false); // 데이터 로드 완료
          })
          .catch(error => {
            console.error('Error fetching notices:', error);
            setLoading(false); // 오류 발생 시에도 로딩 상태 업데이트
          });
      }, []);
    
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${Server_IP}/notice/${id}`);
            alert('게시글이 성공적으로 삭제되었습니다.');
            // 삭제 후 게시글 목록을 다시 불러옵니다.
            setNoticeList(noticeList.filter(notice => notice.id !== id));
        } catch (error) {
            console.error('게시글 삭제 중 오류 발생:', error);
            alert('게시글 삭제 중 오류가 발생했습니다.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (noticeList.length === 0) {
        return <div>No notices available</div>;
    }

    return (
        <div className="faq-list">
            {noticeList.map((notice, index) => (
                <div key={index} className="faq-item">
                    <Link to={`/notice/${notice.id}`}>
                        <h1>{notice.title}</h1>
                    </Link>
                    <p>{notice.content}</p>
                    <p className="date">{formatDate(notice.created_at)}</p>
                    {/* <button className="faq-delete-button" onClick={() => handleDelete(notice.id)}>삭제</button> */}
                </div>
            ))}
        </div>
    );
};

export default NoticeList;
