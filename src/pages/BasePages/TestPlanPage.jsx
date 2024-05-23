import React from "react";
import { Link } from "react-router-dom";
import "../../styles/PageStyle/TestPlanPage.css"
import MyScheduleApp from "../../components/MyPageConponents/MyScheduleApp";

export default function TestPlanPage() {
    return (
        <div>
            <h1> 일정 </h1>
            <div className="plantest">
                일정표
                <div className="planbox">
                    <div className="plantext">지역: 아산</div>
                    <div className="plantext">예산: </div>
                    <div className="plantext">여행테마: </div>
                </div>
                <MyScheduleApp />
            </div>
            <Link to='/myplan'>뒤로가기</Link>
        </div>
    )
}