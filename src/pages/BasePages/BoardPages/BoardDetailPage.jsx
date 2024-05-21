import React from "react";
// import "../../../styles/PageStyle/BoardPage.css"
import BoardDetail from "../../../components/Board/BoardDetail";
import { Link } from "react-router-dom";

export default function BoardDetailPage() {
    return (
        <div className="board-detail-page">
                글 상세보기
                <BoardDetail/>
                <Link className="exit-link" to='/board'>
                뒤로가기
                </Link>
        </div>
    );
}