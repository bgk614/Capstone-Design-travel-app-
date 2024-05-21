import React from "react";
import "../../../styles/PageStyle/BoardPage.css"
import BoardList from "../../../components/Board/BoardList";
import { Link } from "react-router-dom";

export default function BoardPage() {
    return (
        <div>
            <Link className="write-button-link" to='/write'>
                글쓰기
            </Link>
        <BoardList /> 
        </div>
    );
}