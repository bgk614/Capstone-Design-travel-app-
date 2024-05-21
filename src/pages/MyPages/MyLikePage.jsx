import React from "react";
import MyPageNav from "../../components/MyPageConponents/MyPageNavBar";
import MyLike from "../../components/MyPageConponents/MyLike";
import "../../styles/PageStyle/MyPageStyle/MyLikePage.css"
export default function MyLikePage() {
    return (
        <div>

        <div className="my-like-page">
            
            <MyPageNav />
            <MyLike />
            </div>
        </div>
    )
}
