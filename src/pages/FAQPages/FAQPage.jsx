import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "../../styles/PageStyle/FAQPage.css";
import NoticeList from '../../components/FAQ/NoticeList';
import QuestionList from '../../components/FAQ/QuestionList';

const Server_IP = process.env.REACT_APP_Local_Server_IP;

const FAQPage = () => {

    return (
        <div>
            <h1> FAQ </h1>
                <NoticeList/>
                <Link to="/notice/new">추가하기</Link> 
                <QuestionList/>
                <Link to="/question/new">질문하기</Link> 
        </div>
    );
    }
export default FAQPage;
