import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/FAQStyle/NoticeWrite.css'; // CSS 파일 임포트

const Server_IP = process.env.REACT_APP_Local_Server_IP;

const NoticeWrite = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const newNotice = {
            title,
            content
        };

        try {
            await axios.post(`${Server_IP}/notice`, newNotice);  
            alert('공지가 성공적으로 작성되었습니다.');
            navigate('/faq'); // 공지사항 목록 페이지로 이동
        } catch (error) {
            console.error('공지 작성 중 오류 발생:', error);
            alert('공지 작성 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="post-form-container">
            <h2>공지 작성</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">공지제목</label>
                    <input 
                        type="text" 
                        id="title" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content">내용</label>
                    <textarea 
                        id="content" 
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required 
                    ></textarea>
                </div>
                <button type="submit" className="submit-button">작성완료</button>
            </form>
        </div>
    );
};

export default NoticeWrite;
