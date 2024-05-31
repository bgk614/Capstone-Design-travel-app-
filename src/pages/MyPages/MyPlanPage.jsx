import React from "react";
import { Link } from "react-router-dom";
import "../../styles/PageStyle/MyPageStyle/MyPlanPage.css"
import MyPageNav from "../../components/MyPageConponents/MyPageNavBar";
import MyPlan from "../../components/MyPageConponents/MyPlan";

export default function MyPlanPage() {
    return (
        <div >
            <div className="my-plan-page">
            {/* <MyPageNav /> */}
            <MyPlan />
            {/* <div className="make-new-plan-button">
                <Link to="/makeplan">새로운 일정</Link>
            </div> */}
        </div>
        </div>
    )
}