import React from "react";
import MyPageNav from "../../components/MyPageConponents/MyPageNavBar";
import "../../styles/PageStyle/MyPageStyle/MyPage.css"

export default function MyPage() {
    return (
        <div className="my-page">
            <div>

                <MyPageNav />
            </div>
            <div>
                <div>최근여행</div>
            </div>
        </div>
    )
}