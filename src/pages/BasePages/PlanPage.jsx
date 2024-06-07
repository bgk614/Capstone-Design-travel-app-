import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import axios from 'axios';
import CityNavVertical from "../../components/CityNav/CityNavVertical";
import DestinationCategoryBar from "../../components/CityNav/DestinationCategoryBar";
import PlanUploadModal from "../../components/Modal/PlanUploadModal";
import "../../styles/CityNavStyle/CityNavVertical.css";
import "../../styles/CityNavStyle/DestinationCategoryBar.css";
import "../../styles/PageStyle/PlanUploadModal.css";
import "../../styles/PageStyle/PlanPage.css";
import profileImg from '../../assets/images/profile.png';

const Server_IP = process.env.REACT_APP_Local_Server_IP;

const PlanPage = () => {
    const location = useLocation();
    const { id } = useParams();
    const [plans, setPlans] = useState([]);
    const [topPlan, setTopPlan] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState('충청남도');
    const [selectedCategory, setSelectedCategory] = useState('자연');
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [likedPlans, setLikedPlans] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    const fetchPlans = useCallback(async (region = '충청남도', category = '자연') => {
        try {
            const response = await axios.get(`${Server_IP}/plans/`, {
                params: { region, category }
            });
            const fetchedPlans = response.data;
            setPlans(fetchedPlans);

            if (fetchedPlans.length > 0) {
                setTopPlan(fetchedPlans.reduce((prev, current) => (prev.likes > current.likes) ? prev : current));
            } else {
                setTopPlan(null);
            }
        } catch (error) {
            console.error("Error fetching plans", error);
        }
    }, []);

    useEffect(() => {
        fetchPlans(selectedRegion, selectedCategory);
    }, [selectedRegion, selectedCategory, fetchPlans]);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await axios.get(`${Server_IP}/plans/current_user/`);
                setCurrentUser(response.data);
            } catch (error) {
                console.error("Error fetching current user", error);
            }
        };

        fetchCurrentUser();
    }, []);

    const handleLike = async (planId) => {
        try {
            const response = await axios.post(`${Server_IP}/plans/${planId}/like/`);
            console.log('Plan liked:', response.data);
    
            const updatedPlans = plans.map(plan => 
                plan.id === planId ? { ...plan, likes: response.data.likes } : plan
            );
    
            setPlans(updatedPlans);
    
            if (selectedPlan && selectedPlan.id === planId) {
                setSelectedPlan(updatedPlans.find(plan => plan.id === planId));
            }
    
            setTopPlan(updatedPlans.reduce((prev, current) => (prev.likes > current.likes) ? prev : current, updatedPlans[0]));
            setLikedPlans([...likedPlans, planId]);
        } catch (error) {
            console.error("Error liking plan", error);
        }
    };

    const handleUpload = async (newPlan) => {
        if (!currentUser) return;

        try {
            const response = await axios.post(`${Server_IP}/plans/`, newPlan);
            const createdPlan = response.data;
            const updatedPlans = [...plans, createdPlan];
            setPlans(updatedPlans);
            setTopPlan(updatedPlans.reduce((prev, current) => (prev.likes > current.likes) ? prev : current));
        } catch (error) {
            console.error("Error uploading plan", error);
        }
    };

    const plansPerPage = 4;
    const indexOfLastPlan = currentPage * plansPerPage;
    const indexOfFirstPlan = indexOfLastPlan - plansPerPage;

    const filteredPlans = plans.filter(plan => plan.id !== (topPlan ? topPlan.id : null));
    const currentPlans = currentPage === 1
        ? filteredPlans.slice(0, plansPerPage)
        : filteredPlans.slice(indexOfFirstPlan, indexOfLastPlan);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        fetchPlans(selectedRegion, category);
        setCurrentPage(1);
    };

    const handleRegionSelect = (region) => {
        setSelectedRegion(region);
        setSelectedCategory('자연');
        fetchPlans(region, '자연');
        setCurrentPage(1);
    };

    useEffect(() => {
        if (location.pathname === '/plan') {
            setSelectedRegion('충청남도');
            setSelectedCategory('자연');
            fetchPlans('충청남도', '자연');
            setCurrentPage(1);
        }
    }, [location, fetchPlans]);

    return (
        <div className="plan-page-container">
            <div className="plan-page-left">
                <div className="plan-page-text">지역</div>
                <CityNavVertical onCitySelect={handleRegionSelect} selectedRegion={selectedRegion} />
            </div>
            <div className="plan-page-center">
                <div className="plan-page-header-text">플랜</div>
                <DestinationCategoryBar selectedCategory={selectedCategory} onCategorySelect={handleCategorySelect} />
                <div className='plan-list'>
                    {currentPage === 1 && topPlan && (
                        <>
                            <div className='plan-top-text'>1순위 플랜</div>
                            <div className='plan-top-item'>
                                <Link to={`/plans/${topPlan.id}`}>
                                    <div className="plan-images">
                                        {topPlan.images.map((image, index) => (
                                            <img key={index} src={`${Server_IP}/static/${image.split('/').pop()}`} alt={`Top plan image ${index + 1}`} className="plan-image" />
                                        ))}
                                    </div>
                                    <div className="profile-section">
                                        <img src={profileImg} alt="User Profile" className="profile-img" />
                                        <div>{topPlan.userid}</div>
                                    </div>
                                    {topPlan.title}
                                </Link>
                                <div className="heart-section" onClick={() => handleLike(topPlan.id)}>
                                    <span className="heart">
                                        {likedPlans.includes(topPlan.id) ? '❤️' : '🤍'}
                                    </span> 
                                    {topPlan.likes}
                                </div>
                            </div>
                            <div className="plan-divider"></div> {/* 구분선 추가 */}
                        </>
                    )}
                    <div className="plan-items">
                        {currentPlans.length > 0 ? currentPlans.map((plan) => (
                            <div key={plan.id} className='plan-item'>
                                <Link to={`/plans/${plan.id}`}>
                                    <div className="plan-images">
                                        {plan.images.map((image, index) => (
                                            <img key={index} src={`${Server_IP}/static/${image.split('/').pop()}`} alt={`Plan image ${index + 1}`} className="plan-image" />
                                        ))}
                                    </div>
                                    <div className="profile-section">
                                        <img src={profileImg} alt="User Profile" className="profile-img" />
                                        <div>{plan.userid}</div>
                                    </div>
                                    {plan.title}
                                </Link>
                                <div className="heart-section" onClick={() => handleLike(plan.id)}>
                                    <span className="heart">
                                        {likedPlans.includes(plan.id) ? '❤️' : '🤍'}
                                    </span> 
                                    {plan.likes}
                                </div>
                            </div>
                        )) : <p>일정이 없습니다.</p>}
                    </div>
                    <div className="pagination">
                        <ul>
                            {[...Array(Math.ceil((filteredPlans.length + 1) / plansPerPage)).keys()].map(number => (
                                <li key={number + 1} onClick={() => paginate(number + 1)} className={number + 1 === currentPage ? 'active' : ''}>
                                    {number + 1}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="upload-plan-button">
                        <button onClick={() => setIsModalOpen(true)}>일정 올리기</button>
                    </div>
                </div>
            </div>
            {currentUser && (
                <PlanUploadModal 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)} 
                    onUpload={handleUpload} 
                    currentUser={currentUser}
                />
            )}
        </div>
    );
};

export default PlanPage;
