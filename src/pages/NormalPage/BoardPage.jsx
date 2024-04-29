import React from "react";
import "../../styles/PageStyle/Boardpage.css"
export default function BoardPage() {
    return (
        <div className="board">
            <h1> 게시판 </h1>
            <div className="w">
                글 작성</div>
            <div className="n">
                최신글
                <div className="board-t">
                    게시글 제목
                </div>
                
            </div>
            <div className="t">
                오늘 인기글
                <div className="board-t">
                    게시글 제목
                </div>
                <div className="board-t">
                    게시글 제목
                </div>
                <div className="board-t">
                    게시글 제목
                </div>
            </div>
            
        </div>
    );
}