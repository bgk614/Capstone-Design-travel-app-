import React from 'react';
import FindID from '../../components/Auth/FindID';

function FindIDPage() {
    return (
        <div className='findid-container'>
            <div className="headtext">아이디 찾기</div><br />
            <FindID />
        </div>
    )
}

export default FindIDPage;