import React from "react"
import { Link } from "react-router-dom";
import '../styles/MyPageNavStyle/MyPageNav.css';

export default function MyPageNavBar() {
    return (
        <div>
            <div className="MypageNav">
                    <Link className="mypage-nav-link" to='/best'>
                        책갈피
                    </Link>
                    <Link className="mypage-nav-link" to='/destinations'>
                        나의 여행 정보
                    </Link>
                    <Link className="mypage-nav-link" to='/plan'>
                        일정 조회
                    </Link>
                    <Link className="mypage-nav-link" to='/board'>
                        게시글 조회
                    </Link>
                    
                    <Link className="mypage-nav-link" to='/faq'>
                        나의 계정 설정
                    </Link>
            </div> 
        </div>
    );
}
