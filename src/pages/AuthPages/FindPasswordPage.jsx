import React from 'react';
import FindPassword from '../../components/Auth/FindPassword';

function FindPasswordPage() {
    return (
        <div className='findpassword-container'>
            <div className="headtext">비밀번호 찾기</div><br />
            <FindPassword />
        </div>
    )
}

export default FindPasswordPage;
