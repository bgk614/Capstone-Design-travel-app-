import React from "react";
// import "../../../styles/PageStyle/BoardPage.css"
import BoardWrite from "../../../components/Board/BoardWrite";
import { Link } from "react-router-dom";

export default function BoardWritePage() {
    return (
        <div>
                글쓰기 페이지
                <BoardWrite/>
                <Link className="exit-link" to='/board'>
                취소
                </Link>
        </div>
    );
}