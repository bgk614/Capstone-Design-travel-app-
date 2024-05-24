// src/App.js

import React, { useState, useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import axios from 'axios'; // axios 추가
import "./App.css";

import MainPage from './pages/BasePages/MainPage';
import Header from './components/Layout/Header/Header';
import Footer from './components/Layout/Footer/Footer';

import MyPage from './pages/MyPages/MyPage';
import MylikePage from './pages/MyPages/MylikePage';
import MyplanPage from './pages/MyPages/MyplanPage';
import LoginPage from './pages/AuthPages/LoginPage';

import BestDestinationsPage from './pages/BestPages/BestDestinationsPage';
import BestPlanPage from './pages/BestPages/BestPlanPage';
import BestPostPage from './pages/BestPages/BestPostPage';

import DestinationsPage from './pages/BasePages/DestinationsPage';
import BoardPage from './pages/BasePages/BoardPage';
import PlanPage from './pages/BasePages/PlanPage';
import FAQPage from './pages/BasePages/FAQPage';

import MakeplanPage from './pages/MakePlanPages/MakePlansPage';
import SignupPage from './pages/AuthPages/SignupPage';
import TestPlanPage from './pages/BasePages/TestPlanPage';

import CreateFAQ from './pages/WritePages/CreateFAQ'; 
import TripPlacePage from './pages/WritePages/TripPlacePage'; 

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // FastAPI로부터 데이터 가져오기
    axios.get('http://localhost:8000/api/data')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

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
          <Route path="/tripplace" element={<TripPlacePage />} />
          
          <Route path="/plan" element={<PlanPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/createfaq" element={<CreateFAQ />} />
          
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
