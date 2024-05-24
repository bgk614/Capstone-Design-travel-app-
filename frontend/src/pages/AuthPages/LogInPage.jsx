import React from 'react';
import { Link } from "react-router-dom"
import LogIn from '../../components/Auth/LogIn';

function LogInPage() {
    return (
        <div className='login-square'>
            <div className="headtext">로그인</div><br />
            <LogIn />
            <div className="link">
                <Link className="findid-link" to="/findid">
                    아이디 찾기
                </Link>
                <Link className="resetpassword-link" to="/resetpassword">
                    비밀번호 재설정
                </Link>
                <Link className="signup-link" to="/signup">
                    회원가입
                </Link>
            </div>
        </div>
    )
}

export default LogInPage;
