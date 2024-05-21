import React from "react";
import "../../../styles/PageStyle/BoardPageStyle/BoardWritePage.css"
import BoardWrite from "../../../components/Board/BoardWrite";
import { Link } from "react-router-dom";

export default function BoardWritePage() {
    return (
        <div className="board-write-page">
                <Link className="write-exit-link" to='/board'>
                취소
                </Link>
                <BoardWrite/>
        </div>
    );
}