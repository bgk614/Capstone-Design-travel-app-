import React from 'react';
//import { Link } from "react-router-dom"
import BestNav from '../../components/Best/BestNav';
import "../../styles/BestStyle/Best.css"
//import CityNavHorizontal from '../../components/CityNav/CityNavHorizontal';

function BestDestinationsPage() {
    return (
        <div className='allpage'>
            <BestNav/ >
            <div className='best-page'>
                <div className="best-head-text">
                    게시글
                </div>
                <div>글쓰기</div>
                <div>베스트 글 50개</div>
            </div>
        </div>
    )
}

export default BestDestinationsPage;
