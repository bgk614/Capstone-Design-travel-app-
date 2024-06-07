import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import "../../styles/PageStyle/PlanUploadModal.css";

const Server_IP = process.env.REACT_APP_Local_Server_IP;

const cities = [
    '충청남도', '천안시', '공주시', '보령시', 
    '아산시', '서산시', '논산시', '계룡시', 
    '당진시', '금산군', '부여군', '서천군', 
    '청양군', '홍성군', '예산군', '태안군',
];

const destinationCategories = [
    '자연', '도시', '힐링', '문화', '이색',
    '핫플', '체험', '쇼핑', '맛집투어'
];

const PlanUploadModal = ({ isOpen, onClose, onUpload }) => {
    const [schedules, setSchedules] = useState([]);
    const [selectedSchedule, setSelectedSchedule] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    const fetchSchedules = useCallback(async (userid) => {
        try {
            const response = await axios.get(`${Server_IP}/plans/user_schedules`, { params: { userid } });
            setSchedules(response.data);
        } catch (error) {
            console.error("Error fetching schedules", error);
        }
    }, []);

    const fetchCurrentUser = useCallback(async () => {
        try {
            const response = await axios.get(`${Server_IP}/plans/current_user/`);
            setCurrentUser(response.data);
            if (response.data.userid) {
                fetchSchedules(response.data.userid);
            }
        } catch (error) {
            console.error("Error fetching current user", error);
        }
    }, [fetchSchedules]);

    useEffect(() => {
        if (isOpen) {
            fetchCurrentUser();
        }
    }, [isOpen, fetchCurrentUser]);

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        setImages(files);
    };

    const handleUpload = async () => {
        const selectedItinerary = schedules.find(schedule => schedule.id === selectedSchedule).itinerary;

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('region', selectedRegion);
        formData.append('category', selectedCategory);
        formData.append('userid', currentUser.userid);
        formData.append('itinerary', JSON.stringify(selectedItinerary));

        images.forEach((image) => {
            formData.append('images', image);
        });

        try {
            const response = await axios.post(`${Server_IP}/plans/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            onUpload(response.data);
        } catch (error) {
            console.error("Error uploading plan", error);
        }

        closeModal();
    };

    const closeModal = () => {
        setSelectedSchedule('');
        setSelectedRegion('');
        setSelectedCategory('');
        setTitle('');
        setDescription('');
        setImages([]);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>일정 선택</h2>
                {schedules.length > 0 ? (
                    <div className="plan-select">
                        <select value={selectedSchedule} onChange={(e) => setSelectedSchedule(e.target.value)}>
                            <option value="">일정 선택</option>
                            {schedules.map((schedule) => (
                                <option key={schedule.id} value={schedule.id}>{schedule.title}</option>
                            ))}
                        </select>
                    </div>
                ) : <p>일정이 없습니다.</p>}
                <div className="region-category-select">
                    <h3>지역 선택</h3>
                    <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>
                        <option value="">지역 선택</option>
                        {cities.map((region) => (
                            <option key={region} value={region}>{region}</option>
                        ))}
                    </select>
                    <h3>카테고리 선택</h3>
                    <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                        <option value="">카테고리 선택</option>
                        {destinationCategories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
                <div className="plan-details">
                    <h3>사진 추가</h3>
                    <input 
                        type="file" 
                        id="imageUpload" 
                        multiple 
                        onChange={handleImageUpload} 
                    />
                    <div className="uploaded-images">
                        {images.map((image, index) => (
                            <div key={index} className="uploaded-image-name">{image.name}</div>
                        ))}
                    </div>
                    <h3>제목</h3>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <h3>글 작성</h3>
                    <textarea 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        className="description-textarea"
                    ></textarea>
                </div>
                <div className="button-group">
                    <button 
                        className={`upload-button ${selectedSchedule && selectedRegion && selectedCategory && title && description ? 'enabled' : ''}`} 
                        onClick={handleUpload} 
                        disabled={!selectedSchedule || !selectedRegion || !selectedCategory || !title || !description}
                    >
                        선택한 일정 올리기
                    </button>
                    <button className="cancel-button" onClick={closeModal}>취소</button>
                </div>
            </div>
        </div>
    );
};

export default PlanUploadModal;
