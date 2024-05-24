import React from 'react';
import { Link } from "react-router-dom"
import BestNav from '../../components/Best/BestNav';
import "../../styles/BestStyle/Best.css"
import CityNavHorizontal from '../../components/CityNav/CityNavHorizontal';

function BestPlanPage() {
    return (
        <div className='allpage'>
            <BestNav/ >
            <div className='best-page'>
                <div className="best-head-text">
                    일정
                </div>
                <CityNavHorizontal />
                <div>베스트 일정 50개</div>
            </div>
        </div>
    )
}

export default BestPlanPage;
