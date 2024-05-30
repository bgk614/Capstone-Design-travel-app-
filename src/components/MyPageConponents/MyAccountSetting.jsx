import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../../styles/PageStyle/MyPageStyle/MyAccountSettingsPage.css';

const Server_IP = process.env.REACT_APP_Local_Server_IP;

// 계정 설정을 관리하는 리액트 컴포넌트
export default function MyAccountSetting() {
    const [user, setUser] = useState({
        id: '',
        userid: '',
        nickname: '',
        password: '', // 비밀번호는 기본적으로 비워둡니다
        name: '',
        phone: '',
        email: '',
        birthdate: '',
    });
    
    const [initialUser, setInitialUser] = useState(null); // 초기 사용자 상태 저장

    const [errors, setErrors] = useState({}); // 입력 에러 상태

    // 컴포넌트 마운트 시 사용자 정보를 서버에서 가져오기
    useEffect(() => {
        axios.get(`${Server_IP}/user`)  // 엔드포인트 수정
            .then(response => {
                const userData = response.data;
                setUser(prevState => ({
                    ...prevState,
                    ...userData,
                    password: '' // 비밀번호는 기본적으로 비워둡니다
                }));
                setInitialUser(userData); // 초기 사용자 상태 저장
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
            newErrors.email = '이메일을 제대로 입력해주세요';
        }
        if (!user.phone.match(/^[0-9]{10,11}$/)) {
            newErrors.phone = '전화번호를 제대로 입력해주세요.';
        }
        if (user.password && !user.password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
            newErrors.password = '비밀번호는 8자 이상이어야하며 숫자와 알파벳이 포함되어야 합니다.';
        }
        if (!user.nickname) {
            newErrors.nickname = '닉네임을 입력해주세요';
        }
        if (!user.userid) {
            newErrors.userid = '아이디를 입력해주세요';
        }
        if (!user.name) {
            newErrors.name = '이름을 입력해주세요';
        }
        if (!user.birthdate) {
            newErrors.birthdate = '생년월일을 입력해주세요';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    // 변경사항 확인 함수
    function hasChanges() {
        if (!initialUser) return true; // 초기 상태가 설정되지 않았으면 항상 변경된 것으로 간주
        const updatedUser = { ...user };
        delete updatedUser.password; // 비밀번호 필드는 무시
        for (let key in initialUser) {
            if (initialUser[key] !== updatedUser[key]) {
                return true;
            }
        }
        return false;
    }

    // 폼 제출 시 사용자 정보 업데이트 요청
    function handleSubmit(e) {
        e.preventDefault();
        if (!validate()) return; // 유효성 검사 실패 시 중단

        if (!hasChanges()) {
            alert('수정된 사항이 없습니다.');  // 변경사항이 없음을 알림
            return;
        }

        // 비밀번호가 비어 있으면 객체에서 제거
        const updatedUser = { ...user };
        if (!updatedUser.password) {
            delete updatedUser.password;
        }

        axios.put(`${Server_IP}/user`, updatedUser)  // 엔드포인트 수정
            .then(response => {
                alert('업데이트에 성공했습니다.');  // 업데이트 성공 알림
                setInitialUser(updatedUser); // 성공적으로 업데이트 된 후 초기 상태를 업데이트된 사용자 상태로 설정
            })
            .catch(error => {
                alert('오류가 발생했습니다.'); // 업데이트 실패 알림
                console.error("오류가 발생했습니다.", error); // 에러 로깅
            });
    }

    // 비밀번호 필드에서 스페이스바 입력 방지
    function handleKeyDown(e) {
        if (e.key === ' ') {
            e.preventDefault();
        }
    }

    // 사용자 정보 입력 폼 렌더링
    return (
        <div className="account-settings">
            <form onSubmit={handleSubmit}>
                {Object.keys(errors).map(key => (
                    <div key={key} style={{ color: 'red' }}>{errors[key]}</div>
                ))}
                <div className="form-group">
                    <label>닉네임:</label>
                    <input type="text" 
                            name="nickname" 
                            value={user.nickname || ''} 
                            onChange={handleChange}
                            onKeyDown={handleKeyDown} />
                </div>
                <div className="form-group">
                    <label>아이디:</label>
                    <input type="text" 
                            name="userid" 
                            value={user.userid || ''} 
                            onChange={handleChange}
                            onKeyDown={handleKeyDown} />
                </div>
                <div className="form-group">
                    <label>비밀번호:</label>
                    <input type="password" 
                            name="password" 
                            value={user.password || ''} 
                            onChange={handleChange} 
                            onKeyDown={handleKeyDown}/> {/* 비밀번호 타입 수정 */}
                </div>
                <div className="form-group">
                    <label>이름:</label>
                    <input type="text" 
                             name="name" 
                             value={user.name || ''} 
                             onChange={handleChange}
                             onKeyDown={handleKeyDown} />
                </div>
                <div className="form-group">
                    <label>전화번호:</label>
                    <input type="text" 
                            name="phone" 
                            value={user.phone || ''} 
                            onChange={handleChange}
                            onKeyDown={handleKeyDown} />
                </div>
                <div className="form-group">
                    <label>이메일:</label>
                    <input type="email" 
                            name="email" 
                            value={user.email || ''} 
                            onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>생년월일:</label>
                    <input type="date" 
                            name="birthdate" 
                            value={user.birthdate || ''} 
                            onChange={handleChange} />
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
}
