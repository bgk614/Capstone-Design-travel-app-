import React from 'react';
import { Route, Routes } from "react-router-dom";
import "./App.css";

import MainPage from './pages/NormalPage/MainPage';
import Header from './components/Layout/Header/Header';
import Footer from './components/Layout/Footer/Footer';

import MyPage from './pages/MyPages/MyPage';
import MylikePage from './pages/MyPages/MylikePage';
import MyplanPage from './pages/MyPages/MyplanPage';
import LoginPage from './pages/AuthPages/LoginPage';

import BestDestinationsPage from './pages/BestPages/BestDestinationsPage';
import BestPlanPage from './pages/BestPages/BestPlanPage';
import BestPostPage from './pages/BestPages/BestPostPage';

import DestinationsPage from './pages/NormalPage/DestinationsPage';
import BoardPage from './pages/NormalPage/BoardPage';
import PlanPage from './pages/NormalPage/PlanPage';
import FAQPage from './pages/NormalPage/FAQPage';

import MakeplanPage from './pages/MakeplanPage';

import SignupPage from './pages/AuthPages/SignupPage';

import TestPlanPage from './pages/NormalPage/TestPlanPage';

function App() {

    return (
      <div className="App">
        <Header />
        <div className='center-page'>

        <Routes>
          <Route path="/" element={<MainPage />} />

          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mylike" element={<MylikePage />} />
          <Route path="/myplan" element={<MyplanPage />} />
          <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} /> 

          <Route path="/best" element={<BestDestinationsPage />} />
          <Route path="/board" element={<BoardPage />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/plan" element={<PlanPage />} />
          <Route path="/faq" element={<FAQPage />} />

          <Route path="/makeplan" element={<MakeplanPage />} />

          <Route path="/bestdestinations" element={<BestDestinationsPage />} />
          <Route path="/bestplan" element={<BestPlanPage />} />
          <Route path="/bestpost" element={<BestPostPage />} />
          <Route path="/testplan" element={<TestPlanPage />} />

        </Routes>
        </div>
        
        <Footer />
        </div>
    );
}

export default App;