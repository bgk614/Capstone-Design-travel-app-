import React from 'react';
import { Link } from 'react-router-dom';
import FindID from '../../components/Auth/FindID';

function FindIDPage() {
    return (
        <div className='findid-container'>
            <div className="headtext">아이디 찾기</div><br />
            <FindID />
            <Link className="menu-link" to='/login'>
                취소
            </Link>
        </div>
    )
}

export default FindIDPage;
