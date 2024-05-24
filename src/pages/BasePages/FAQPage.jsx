import React from "react";
import { Link } from "react-router-dom";
import "../../styles/PageStyle/Faqpage.css"
export default function FAQPage() {
    return (
        <div>
            <h1> FAQ </h1>
            
            <div className="info">
                공지사항
                <div className="faqlist">
                    공지1
                </div>
                <div className="faqlist">
                    공지2
                </div>
                <Link to="/createfaq" className="faqlist">추가하기</Link> 
            </div>
            <div className="faqbox">
                많이하는 질문
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