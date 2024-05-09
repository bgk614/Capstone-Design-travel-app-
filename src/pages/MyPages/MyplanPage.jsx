import React from "react";
import { Link } from "react-router-dom";
import "../../styles/PageStyle/MyPageStyle/MyPlanPage.css"

export default function MyplanPage() {
    return (
        <div>
            <h1> MyplanPage </h1>
            <div className="plans">
                <div className="lp">
                    지난일정
                    <Link to='/testplan'>
                        <div className="plan1">
                        일정1
                        </div>
                    </Link>
                </div>
                    
                <div className="fp">
                    예정일정
                    <div className="plan1">
                        일정2
                    </div>
                    <div className="plan1">
                        일정3
                    </div>
                </div>
            </div>
            <div>일정 만들기</div>
            <div>일정 삭제하기</div>
            <div>일정 수정</div>
        </div>
    )
}