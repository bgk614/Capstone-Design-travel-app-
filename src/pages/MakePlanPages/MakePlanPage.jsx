import React, { useState, useEffect } from "react";
import axios from 'axios';
import "../../styles/PageStyle/MakePlanPage.css";  // CSS 파일 임포트

export default function MakePlanPage() {
    const [userInput, setUserInput] = useState('');  // 사용자 입력 상태
    const [chat, setChat] = useState([]);  // 채팅 메시지 상태
    const [loading, setLoading] = useState(false);  // 로딩 상태

    useEffect(() => {
        // 컴포넌트가 마운트될 때 기존 채팅 메시지를 백엔드에서 가져옴
        fetchChatHistory();
    }, []);

    const fetchChatHistory = async () => {
        // 기존 채팅 메시지를 가져오는 함수
        try {
            const response = await axios.get('http://localhost:8000/chat/');
            setChat(response.data.messages);  // 채팅 메시지 상태 업데이트
        } catch (error) {
            console.error('Error fetching chat history:', error);  // 에러 로그 출력
        }
    };

    const handleInputChange = (event) => {
        // 입력 필드 변경 핸들러
        setUserInput(event.target.value);
    };

    const handleSubmit = async (event) => {
        // 폼 제출 핸들러
        event.preventDefault();
        if (!userInput.trim()) return;  // 입력값이 없으면 리턴
        const message = { sender: 'user', text: userInput, created_at: new Date().toISOString() };
        updateChat(message);  // 사용자 메시지 추가
        await saveMessage(message);  // 메시지를 백엔드에 저장
        await sendQuery(userInput);  // OpenAI API에 질문 전송
        setUserInput('');  // 입력 필드를 초기화
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      };    

    const saveMessage = async (message) => {
        // 메시지를 백엔드에 저장하는 함수
        try {
            await axios.post('http://localhost:8000/chat/', message);
        } catch (error) {
            console.error('Error saving message:', error);  // 에러 로그 출력
        }
    };

    const sendQuery = async (query) => {
        // OpenAI API에 질문을 보내는 함수
        setLoading(true);  // 로딩 상태 설정
        try {
            const result = await axios.post('http://localhost:8000/chat/query_chatgpt/', { sender: 'user', text: query });
            const responseText = result.data.text;
            updateChat({ sender: 'chatgpt', text: responseText, created_at: new Date().toISOString() });  // OpenAI 응답 추가
            
        } catch (error) {
            console.error('Error communicating with ChatGPT:', error);  // 에러 로그 출력
            updateChat({ sender: 'chatgpt', text: `Failed to fetch response: ${error.response?.data?.detail || error.message}`, created_at: new Date().toISOString() });  // 에러 메시지 추가
        } finally {
            setLoading(false);  // 로딩 상태 해제
        }
    };

    const updateChat = (message) => {
        // 채팅 메시지 상태 업데이트
        setChat(prevChat => [...prevChat, message]);
    };

    return (
        <div className="make-plan-page">
            <h1>성향파악 질의응답</h1>
            {chat.map((message, index) => (
                <div key={index} className={`message ${message.sender}`}>
                    <p>{message.text}</p>
                    <small>{formatDate(message.created_at).toLocaleString()}</small>  
                </div>
            ))}
            <form onSubmit={handleSubmit} className="response-form">
                <label>답변:</label>
                <textarea
                    value={userInput}
                    onChange={handleInputChange}
                    placeholder="답변"
                    rows="3"
                    cols="50"
                />
                <button type="submit" disabled={loading}>다음</button>
            </form>
            {loading && <p>Loading...</p>}  
        </div>
    );
}
