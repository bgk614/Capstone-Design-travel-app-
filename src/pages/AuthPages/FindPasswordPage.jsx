import React from 'react';
import { Link } from 'react-router-dom';
import FindPassword from '../../components/Auth/FindPassword';

function FindPasswordPage() {
    return (
        <div className='findpassword-container'>
            <div className="headtext">비밀번호 찾기</div><br />
            <FindPassword />
            <Link className="menu-link" to='/login'>
                취소
            </Link>
        </div>
    )
}

export default FindPasswordPage;
