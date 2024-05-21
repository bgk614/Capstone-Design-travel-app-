import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../../styles/PageStyle/MyPageStyle/MyAccountSettingsPage.css'; 

// 계정 설정을 관리하는 리액트 컴포넌트
export default function MyAccountSetting() {
    const [user, setUser] = useState({
        // nicname: '', // 닉네임 상태 추가
        name: '',
        // phone: '',
        // email: '',
        // address: '',
    });

    const [errors, setErrors] = useState({}); // 입력 에러 상태

    // 컴포넌트 마운트 시 사용자 정보를 서버에서 가져오기
    useEffect(() => {
        axios.get('http://localhost:8080/api/users/me')
            .then(response => {
                setUser(response.data);  // 성공 시 사용자 데이터로 상태 업데이트
            })
            .catch(error => console.error("Error fetching user data", error));
    }, []);

    // 입력 필드 변경 시 사용자 상태 업데이트
    function handleChange(e) {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
        // 에러 상태 업데이트
        if (errors[name]) {
            setErrors({ ...errors, [name]: null });
        }
    }

    // 유효성 검사
    function validate() {
        const newErrors = {};
        if (!user.email.includes('@')) {
            newErrors.email = 'Invalid email address.';
        }
        if (!user.phone.match(/^[0-9]{10,11}$/)) {
            newErrors.phone = 'Phone number must be 10-11 digits.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    // 폼 제출 시 사용자 정보 업데이트 요청
    function handleSubmit(e) {
        e.preventDefault();
        if (!validate()) return; // 유효성 검사 실패 시 중단

        axios.put('http://localhost:8080/api/users/me', user)
            .then(response => {
                alert('User updated successfully');  // 업데이트 성공 알림
            })
            .catch(error => {
                alert('Error updating user'); // 업데이트 실패 알림
                console.error("Error updating user", error); // 에러 로깅
            });
    }

    // 사용자 정보 입력 폼 렌더링
    return (
        <div className="account-settings">
            <form onSubmit={handleSubmit}>
                {Object.keys(errors).map(key => (
                    <div key={key} style={{ color: 'red' }}>{errors[key]}</div>
                ))}
                {/* <div className="form-group">
                    <label>닉네임:</label>
                    <input type="text" name="nicname" value={user.nicname || ''} onChange={handleChange} />
                </div> */}
                <div className="form-group">
                    <label>이름:</label>
                    <input type="text" name="name" value={user.name || ''} onChange={handleChange} />
                </div>
                {/* <div className="form-group">
                    <label>전화번호:</label>
                    <input type="text" name="phone" value={user.phone || ''} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>이메일:</label>
                    <input type="email" name="email" value={user.email || ''} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>주소:</label>
                    <input type="text" name="address" value={user.address || ''} onChange={handleChange} />
                </div> */}
                
                <button type="submit">Update</button>
            </form>
        </div>
    );
}