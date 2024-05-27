import React from "react";
// import "../../../styles/PageStyle/BoardPage.css"
import BoardDetail from "../../components/Board/BoardDetail";
import { Link } from "react-router-dom";

export default function BoardDetailPage() {
    return (
        <div className="board-detail-page">
                <Link className="exit-link" to='/board'>
                목록으로 돌아가기
                </Link>
                <BoardDetail/>
        </div>
    );
}