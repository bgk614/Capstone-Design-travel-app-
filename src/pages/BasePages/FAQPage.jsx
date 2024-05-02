import React from "react";
import "../../styles/PageStyle/FAQPage.css"
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
                </div>
            <div className="faqbox">
            <div>많이하는 질문</div>
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
                <div>질문하기</div>
            </div>
            
        </div>
    )
    
}