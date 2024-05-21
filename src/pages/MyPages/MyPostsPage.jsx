import React from "react";
import MyPageNav from "../../components/MyPageConponents/MyPageNavBar";
import MyPost from "../../components/MyPageConponents/MyPost";
import '../../styles/PageStyle/MyPageStyle/MyPostPage.css'

export default function MyPostsPage() {
    return (
        <div>
            <div className="my-post-page">
                <MyPageNav />
                <MyPost />
            </div>
        </div>
    )
}