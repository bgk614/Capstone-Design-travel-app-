import React from "react"
import { Link } from "react-router-dom";
import '../styles/MyPageNavStyle/MyPageNav.css';

export default function MyPageNavBar() {
    return (
        <div>
            <div className="my-page-nav">
                    <Link className="mypage-nav-link" to='/mylike'>
                        책갈피
                    </Link>
                    <Link className="mypage-nav-link" to='/mytravelpreference'>
                        나의 여행 정보
                    </Link>
                    <Link className="mypage-nav-link" to='/myplan'>
                        일정 조회
                    </Link>
                    <Link className="mypage-nav-link" to='/mypost'>
                        게시글 조회
                    </Link>
                    <Link className="mypage-nav-link" to='/myaccount'>
                        나의 계정 설정
                    </Link>
            </div> 
        </div>
    );
}
