import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import "../../styles/FAQStyle/QuestionList.css"; // CSS 파일 임포트

const Server_IP = process.env.REACT_APP_Local_Server_IP;

const QuestionList = () => {
    const [questionList, setQuestionList] = useState([]); // 상태 변수 이름 수정
    const [loading, setLoading] = useState(true); // 로딩 상태 추가

    useEffect(() => {
        console.log(`Fetching question list from ${Server_IP}/question`);
        axios.get(`${Server_IP}/question`)
          .then(response => {
            console.log('Fetched notices:', response.data); 
            setQuestionList(response.data.questions);  // 응답 데이터를 직접 상태로 설정
            setLoading(false); // 데이터 로드 완료
          })
          .catch(error => {
            console.error('Error fetching question:', error);
            setLoading(false);
          });
      }, []);
    
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${Server_IP}/question/${id}`);
            alert('질문이 성공적으로 삭제되었습니다.');
            // 삭제 후 질문 목록을 다시 불러옵니다.
            setQuestionList(questionList.filter(question => question.id !== id));
        } catch (error) {
            console.error('질문 삭제 중 오류 발생:', error);
            alert('질문 삭제 중 오류가 발생했습니다.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (questionList.length === 0) {
        return <div>No question available</div>;
    }

    return (
        <div className="question-list">
            <h1>질문 목록</h1>
            {questionList.map((question, index) => ( 
                <div key={index} className="question-item">
                    <Link to={`/question/${question.id}`}>
                        <h2>{question.title}</h2>
                    </Link>
                    <p>{question.question}</p>
                    <p>{question.asker}</p>
                    <p className="date">{formatDate(question.created_at)}</p>
                    <button className="question-delete-button" onClick={() => handleDelete(question.id)}>삭제</button>
                </div>
            ))}
        </div>
    );
};

export default QuestionList;
