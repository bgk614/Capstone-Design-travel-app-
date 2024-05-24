import React from 'react';
import Signup from '../../components/Auth/Signup';

function SignupPage() {
    return (
        <div className='signup-container'>
            <div className="headtext">회원가입</div><br />
            <SignUp />
        </div>
    )
}

export default SignupPage;
