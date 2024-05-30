import React from 'react';
import { Link } from 'react-router-dom';
import Signup from '../../components/Auth/Signup';

function SignupPage() {
    return (
        <div className='signup-container'>
            <div className="headtext">회원가입</div><br />
            <Signup />
            <Link className="menu-link" to='/login'>
                취소
            </Link>
        </div>
    )
}

export default SignupPage;
