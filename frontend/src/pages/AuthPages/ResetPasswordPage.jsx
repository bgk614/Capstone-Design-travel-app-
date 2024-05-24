import React from 'react';
import ResetPassword from '../../components/Auth/ResetPassword';

function ResetPasswordPage() {
    return (
        <div className='resetpassword-container'>
            <div className="headtext">비밀번호 재설정</div><br />
            <ResetPassword />
        </div>
    )
}

export default ResetPasswordPage;