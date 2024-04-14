import React from 'react';
import { Link } from "react-router-dom"
import Login from '../../components/Auth/Login';

function LoginPage() {
    return (
        <div className='login-square'>
            <div className="headtext">로그인</div><br />
            <Login />
            <div className="link">
                <Link className="findid-link" to="/findid">
                    아이디 찾기
                </Link>
                <Link className="findpassword-link" to="/findpassword">
                    비밀번호 찾기
                </Link>
                <Link className="signup-link" to="/signup">
                    회원가입
                </Link>
            </div>
        </div>
    )
}

export default LoginPage;
