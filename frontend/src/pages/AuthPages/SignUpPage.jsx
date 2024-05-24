import React from 'react';
import SignUp from '../../components/Auth/SignUp';

function SignUpPage() {
    return (
        <div className='signup-container'>
            <div className="headtext">회원가입</div><br />
            <SignUp />
        </div>
    )
}

export default SignUpPage;
