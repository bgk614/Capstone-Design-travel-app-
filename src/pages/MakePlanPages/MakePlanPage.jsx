import React from "react";
import "../../styles/PageStyle/MakeplanPage.css"

export default function MakeplanPage() {
    return (
        <div className="makeplanpage">
            <h1> MakeplanPage </h1>
            <div>질의응답 구현</div>
            <div className="countbar">
                질문 진행 정도
                <div className="bar"></div>
            </div>

            <div className="qna">
                <div className="q">질문</div>
                <div className="a">답변</div>
                <div className="ar">
                    <div className="arrow">이전 질문</div>
                    <div className="arrow">다음으로</div>
                </div>
            </div>
            
            <div className="reset_b">처음부터 다시하기</div>
        </div>
    )
}
