import React, { useState } from 'react';
import "../../styles/PageStyle/Destinationspage.css";

function TripPlacePage() {
    const [name, setName] = useState('');  // 이름 상태 추가
    const [location, setLocation] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');

    const handleImageChange = (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Name:', name);  // 이름 로깅
        console.log('Location:', location);
        console.log('Content:', content);
        console.log('Category:', category);
        console.log('Image:', image);
    };

    const categories = ["자연", "도시", "힐링", "문화", "이색", "핫플", "체험", "쇼핑", "맛집"];

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>이름:</label> 
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>지역 :</label>
                    <select
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                        required
                    >
                        <option value="">지역을 선택해주세요</option>
                        <option value="천안시">천안시</option>
                        <option value="공주시">공주시</option>
                        <option value="보령시">보령시</option>
                        <option value="아산시">아산시</option>
                        <option value="서산시">서산시</option>
                        <option value="논산시">논산시</option>
                        <option value="계룡시">계룡시</option>
                        <option value="당진시">당진시</option>
                        <option value="금산군">금산군</option>
                        <option value="부여군">부여군</option>
                        <option value="서천군">서천군</option>
                        <option value="청양군">청양군</option>
                        <option value="홍성군">홍성군</option>
                        <option value="예산군">예산군</option>
                        <option value="태안군">태안군</option>
                    </select>
                </div>
                <div>
                    <label>카테고리:</label>
                    <div>
                        {categories.map((cat, index) => (
                            <label key={index}>
                                <input
                                    type="radio"
                                    value={cat}
                                    checked={category === cat}
                                    onChange={() => setCategory(cat)}
                                    required
                                />
                                {cat}
                            </label>
                        ))}
                    </div>
                </div>
                <div>
                    <label>내용:</label>
                    <textarea
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>사진:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                    />
                    {previewUrl && <img src={previewUrl} alt="Preview" style={{ width: '100px', height: '100px' }} />}
                </div>
                <button type="submit">제출</button>
            </form>
        </div>
    );
}

export default TripPlacePage;
