import React from 'react';
// import { Link } from "react-router-dom"
import BestNav from '../../components/Best/BestNav';
import "../../styles/BestStyle/Best.css"
import CityNavHorizontal from '../../components/CityNav/CityNavHorizontal';

function BestDestinationsPage() {
    return (
        <div className='allpage'>
            <BestNav/ >
            <div className='best-page'>
                <div className="best-head-text">
                    여행지
                </div>
                <CityNavHorizontal />
                <div>베스트 여행지 50개</div>
                <div className='best-d-list'>
                    <div className='best-d-1'>여행지1</div>
                    <div className='best-d-1'>여행지2</div>
                    <div className='best-d-1'>여행지3</div>
                    <div className='best-d-1'>여행지4</div>
                </div>
                <div className='best-d-list'>
                    <div className='best-d-1'>여행지5</div>
                    <div className='best-d-1'>여행지6</div>
                    <div className='best-d-1'>여행지7</div>
                    <div className='best-d-1'>여행지8</div>
                </div>
                
            </div>
        </div>
    )
}

export default BestDestinationsPage;
