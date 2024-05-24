import React from "react";
import { Link } from "react-router-dom";
import "../../styles/PageStyle/FAQPage.css"

export default function FAQPage({ notices }) {
    return (
        <div>
            <h1> FAQ </h1>
            
            <div className="info">
                <h2>공지사항</h2>
                <div className="faqlist">
                    {/* 공지사항 목록을 반복하여 출력 */}
                    {notices.map((notice, index) => (
                        <div className="faqlist" key={index}>
                            {notice}
                        </div>
                    ))}
                </div>
                <Link to="/createfaq" className="faqlist">추가하기</Link> 
            </div>
            <div className="faqbox">
                <h2>많이하는 질문</h2>
                <div className="faqlist">
                    질문1
                </div>
                <div className="faqlist">
                    질문2
                </div>
                <div className="faqlist">
                    질문4
                </div>
                <div className="faqlist">
                    질문5
                </div>
                <Link to="/createfaq" className="faqlist">질문하기</Link> 
            </div>
        </div>
    )
}