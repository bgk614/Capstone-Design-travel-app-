import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function MakePlanPage() {
    const [userInput, setUserInput] = useState('');
    const [chat, setChat] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate ChatGPT sending the first message
        sendQuery("Hello! How can I assist you with your plans today?");
    }, []);

    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!userInput.trim()) return;
        updateChat({ sender: 'user', text: userInput });
        sendQuery(userInput);
        setUserInput(''); // Clear input after sending
    };

    const sendQuery = async (query) => {
        setLoading(true);
        try {
            const result = await axios.post('https://api.openai.com/v1/engines/chatgpt/completions', {
                prompt: query,
                max_tokens: 150
            }, {
                headers: {
                    'Authorization': `Bearer YOUR_API_KEY`,
                    'Content-Type': 'application/json'
                }
            });
            updateChat({ sender: 'chatgpt', text: result.data.choices[0].text.trim() });
        } catch (error) {
            console.error('Error communicating with ChatGPT:', error);
            updateChat({ sender: 'chatgpt', text: 'Failed to fetch response.' });
        } finally {
            setLoading(false);
        }
    };

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
