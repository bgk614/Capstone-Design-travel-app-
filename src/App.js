import React from 'react';
import { Route, Routes } from "react-router-dom";
import "./App.css";

import MainPage from './pages/MainPage';
import Header from './components/Layout/Header/Header';
import Footer from './components/Layout/Footer/Footer';

import MyPage from './pages/MyPages/MyPage';
import MylikePage from './pages/MyPages/MylikePage';
import MyplanPage from './pages/MyPages/MyplanPage';
import LoginPage from './pages/AuthPages/LoginPage';

import BestPage from './pages/BestPage';
import DestinationsPage from './pages/DestinationsPage';
import BoardPage from './pages/BoardPage';
import FAQPage from './pages/FAQPage';

import MakeplanPage from './pages/MakeplanPage';

import SignupPage from './pages/AuthPages/SignupPage';

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

          <Route path="/best" element={<BestPage />} />
          <Route path="/board" element={<BoardPage />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/faq" element={<FAQPage />} />

          <Route path="/makeplan" element={<MakeplanPage />} />

          <Route path="/signup" element={<SignupPage />} />

        </Routes>
        </div>
        
        <Footer />
        </div>
    );
}

export default App;