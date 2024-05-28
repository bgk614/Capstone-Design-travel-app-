import React from 'react';
import { Route, Routes } from "react-router-dom";
import { useState, useEffect, createContext } from 'react';
import "./App.css";

import MainPage from './pages/BasePages/MainPage';
import Header from './components/Layout/Header/Header';
import Footer from './components/Layout/Footer/Footer';

import MyPage from './pages/MyPages/MyPage';
import MyLikePage from './pages/MyPages/MyLikePage';
import MyAccountSettingsPage from './pages/MyPages/MyAccountSettingsPage';
import MyPlanPage from './pages/MyPages/MyPlanPage';
import MyTravelPreferencePage from './pages/MyPages/MyTravelPreferencePage';
import MyPostsPage from './pages/MyPages/MyPostsPage';

import BestDestinationsPage from './pages/BestPages/BestDestinationsPage';
import BestPlanPage from './pages/BestPages/BestPlanPage';
import BestPostPage from './pages/BestPages/BestPostPage';

import DestinationsPage from './pages/BasePages/DestinationsPage';
import BoardPage from './pages/BoardPages/BoardPage';
import PlanPage from './pages/BasePages/PlanPage';
import FAQPage from './pages/FAQPages/FAQPage';
import MakePlanPage from './pages/MakePlanPages/MakePlanPage';

import LoginPage from './pages/AuthPages/LoginPage';
import SignupPage from './pages/AuthPages/SignupPage';
import FindIDPage from './pages/AuthPages/FindIDPage';
import FindPasswordPage from './pages/AuthPages/FindPasswordPage';

import BoardWritePage from './pages/BoardPages/BoardWritePage';
import BoardDetailPage from './pages/BoardPages/BoardDetailPage';

import QuestionWritePage from './pages/FAQPages/QuestionWritePage';
import NoticeWritePage from './pages/FAQPages/NoticeWritePage';
import MasterAnswerPage from './pages/FAQPages/MasterAnswerPage';
import TripPlacePage from './pages/TripPlacePages/TripPlacePage';

import NoticeDetailPage from './pages/FAQPages/NoticeDetailPage';
import QuestionDetailPage from './pages/FAQPages/QuestionDetailPage';

// 로그인 상태를 관리하는 Context 생성
export const AuthContext = createContext();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage]=useState([]);
  
  useEffect(()=>{
      fetch("/api/demo-web")
      .then((response)=>{
        return response.json();
       })
      .then((data)=>{
        setMessage(data);
       });
    },[]);

  return (
      <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>

      <div className="App">
        <Header />
        <div className='center-page'>
          <div>{message}</div>
          <Routes>
            <Route path="/" element={<MainPage />} />
              {/* 우측상단 네비바 */}
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/mylike" element={<MyLikePage />} />
              <Route path="/myplan" element={<MyPlanPage />} />
              <Route path="/myaccount" element={<MyAccountSettingsPage />} />
              <Route path="/mypost" element={<MyPostsPage />} />
              <Route path="/mytravelpreference" element={<MyTravelPreferencePage />} />

              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/findid" element={<FindIDPage />} />
              <Route path="/findpassword" element={<FindPasswordPage />} />

              {/* 기본페이지 네비바 */}
              <Route path="/best" element={<BestDestinationsPage />} />
              <Route path="/board" element={<BoardPage />} />
              <Route path="/destinations" element={<DestinationsPage />} />
              <Route path="/plan" element={<PlanPage />} />
              <Route path="/faq" element={<FAQPage />} />

              {/* 문의 페이지 */}
              <Route path="/question/new" element={<QuestionWritePage />} /> 
              <Route path="/notice/new" element={<NoticeWritePage />} />
              <Route path="/notice/:id" element={<NoticeDetailPage />} />
              <Route path="/question/:id" element={<QuestionDetailPage />} />

              <Route path="/makeplan" element={<MakePlanPage />} />

              {/* 베스트 페이지 */}
              <Route path="/bestdestinations" element={<BestDestinationsPage />} />
              <Route path="/bestplan" element={<BestPlanPage />} />
              <Route path="/bestpost" element={<BestPostPage />} />

              {/* 게시판 페이지 */}
              <Route path="/write" element={<BoardWritePage />} />
              <Route path="/board/:id" element={<BoardDetailPage />} />
                
          </Routes>
        </div>
        <Footer />
      </div>
    </AuthContext.Provider>
  );

}
export default App;