import React from "react";
// import "../../../styles/PageStyle/QuestionPage.css"
import QuestionDetail from "../../components/FAQ/QuestionDetail";
import { Link } from "react-router-dom";
import Answer from "../../components/FAQ/Answer";

export default function QuestionDetailPage() {
    return (
        <div className="Question-detail-page">
                <Link className="exit-link" to='/faq'>
                목록으로 돌아가기
                </Link>
                <QuestionDetail/>
                <Answer />
        </div>
    );
}