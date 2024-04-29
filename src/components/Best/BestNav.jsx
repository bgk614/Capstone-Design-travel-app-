import React from 'react';
import { Link } from "react-router-dom";
import "../../styles/BestStyle/BestNav.css";

function BestNav() {
    return (
        <div className='nav'>
            <div className="best-text">
                BEST
            </div>
            <br />
            <Link className="bestnav-link" to='/bestdestinations'>
                여행지
            </Link>
            <Link className="bestnav-link" to='/bestplan'>
                일정
            </Link>
            <Link className="bestnav-link" to='/bestpost'>
                게시글
            </Link>
        </div>
    )
}

export default BestNav;
