import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "../../styles/PageStyle/FAQPage.css";

export default function FAQPage() {
    const [notices, setNotices] = useState([]); // 초기 상태를 빈 배열로 설정

    useEffect(() => {
        // 데이터 가져오기 예시
        fetch('/api/notices')
        .then(response => response.json())
        .then(data => {
            // 데이터가 배열인지 확인하고 설정
            if (Array.isArray(data)) {
                setNotices(data);
            } else {
                console.error('Fetched data is not an array:', data);
                setNotices([]); // 예상치 못한 데이터 형식인 경우 빈 배열로 설정
            }
        })
        .catch(error => {
            console.error('Error fetching notices:', error);
            setNotices([]); // 오류 발생 시 notices를 빈 배열로 설정
        });
    }, []);

    return (
        <div>
            <h1> FAQ </h1>
            <div className="info">
                <h2>공지사항</h2>
                <div className="faqlist">
                    {/* 공지사항 목록을 반복하여 출력 */}
                    {notices.length === 0 ? (
                        <p>No notices available</p> // notices가 빈 배열일 때
                    ) : (
                        notices.map((notice, index) => (
                            <div className="faqlist" key={index}>
                                {notice.title}
                            </div>
                        ))
                    )}
                </div>
                <Link to="/createfaq" className="faqlist">추가하기</Link> 
            </div>
            <div className="faqbox">
                <h2>많이하는 질문</h2>
                <div className="faqlist">
                    {/* 추가적으로 자주 묻는 질문들을 여기에 나열 */}
                </div>
                <Link to="/createfaq" className="faqlist">질문하기</Link> 
            </div>
        </div>
    );
}