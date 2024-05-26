import React from "react";
import "../../styles/PageStyle/BoardPageStyle/BoardPage.css"
import BoardList from "../../components/Board/BoardList";
import { Link } from "react-router-dom";

export default function BoardPage() {
    return (
        <div className="board-page">
            <Link className="write-button-link" to='/write'>
                글쓰기
            </Link>
            <BoardList /> 
        </div>
    );
}