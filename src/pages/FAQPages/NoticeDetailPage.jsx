import React from "react";
import NoticeDetail from "../../components/FAQ/NoticeDetail";
import { Link } from "react-router-dom";

export default function NoticeDetailPage() {
    return (
        <div className="Notice-detail-page">
                <Link className="exit-link" to='/faq'>
                목록으로 돌아가기
                </Link>
                <NoticeDetail/>
        </div>
    );
}