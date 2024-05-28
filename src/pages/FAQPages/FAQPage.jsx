import React from 'react';
import { Link } from "react-router-dom";
import "../../styles/PageStyle/FAQPageStyle/FAQPage.css";
import NoticeList from '../../components/FAQ/NoticeList';
import QuestionList from '../../components/FAQ/QuestionList';

const FAQPage = () => {

    return (
        <div className='faq-page'>
            <div className='faq-page-container'>
                <div className='faq-page-header'>
                    <h2>공지사항</h2>
                    <Link to="/notice/new" className='faq-link-button'>추가하기</Link>
                </div>
                <NoticeList />
            </div>
            <div className='faq-page-container'>
                <div className='faq-page-header'>
                    <h2>문의</h2>
                    <Link to="/question/new" className='faq-link-button'>질문하기</Link>
                </div>
                <QuestionList />
            </div>
        </div>
    );
}

export default FAQPage;
