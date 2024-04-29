import React from "react"
import { Link } from "react-router-dom";
import '../../../styles/HeaderStyle/Navbar.css';

export default function Navbar() {
    return (
        <div>
            <div className="navbar">
                    <Link className="nav-link" to='/best'>
                        베스트
                    </Link>
                    <Link className="nav-link" to='/destinations'>
                        여행지
                    </Link>
                    <Link className="nav-link" to='/plan'>
                        일정
                    </Link>
                    <Link className="nav-link" to='/board'>
                        게시판
                    </Link>
                    
                    <Link className="nav-link" to='/faq'>
                        문의
                    </Link>
            </div> 
        </div>
    );
}
