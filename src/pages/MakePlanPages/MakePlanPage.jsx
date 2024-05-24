import React, { useState, useEffect } from "react";
import axios from 'axios';
import "../../styles/PageStyle/MakePlanPage.css";  // CSS 파일 임포트

export default function MakePlanPage() {
    const [userInput, setUserInput] = useState('');
    const [chat, setChat] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch existing chat messages from the backend
        fetchChatHistory();
    }, []);

    const fetchChatHistory = async () => {
        try {
            const response = await axios.get('http://localhost:8000/chat/');
            setChat(response.data.messages);
        } catch (error) {
            console.error('Error fetching chat history:', error);
        }
    };

    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!userInput.trim()) return;
        updateChat({ sender: 'user', text: userInput });
        await saveMessage({ sender: 'user', text: userInput });
        // sendQuery(userInput);
        setUserInput(''); // Clear input after sending
    };

    const saveMessage = async (message) => {
        try {
            await axios.post('http://localhost:8000/chat/', message);
        } catch (error) {
            console.error('Error saving message:', error);
        }
    };

    // const sendQuery = async (query) => {
    //     setLoading(true);
    //     try {
    //         const result = await axios.post('http://localhost:8000/query_chatgpt/', { query });
    //         const responseText = result.data.response;
    //         updateChat({ sender: 'chatgpt', text: responseText });
    //         await saveMessage({ sender: 'chatgpt', text: responseText });
    //     } catch (error) {
    //         console.error('Error communicating with ChatGPT:', error);
    //         // 에러 메시지를 문자열로 변환하여 전달
    //         updateChat({ sender: 'chatgpt', text: `Failed to fetch response: ${error.response?.data?.detail || error.message}` });
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const updateChat = (message) => {
        setChat(prevChat => [...prevChat, message]);
    };

    return (
        <div className="make-plan-page">
            <h1>성향파악 질의응답</h1>
            {chat.map((message, index) => (
                <div key={index} className={`message ${message.sender}`}>
                    <p>{message.text}</p>
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
