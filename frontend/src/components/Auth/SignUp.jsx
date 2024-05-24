import React, { useState } from 'react';
import axiox from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/LogInStyle/SignUp.css';

function SignUp() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();


  function validateInputs () {
    const inputErrors = {};
    if (!userId) {
      inputErrors.userId = '아이디를 입력하세요.';
    }
    if (!password || password.length < 8 || password.length > 20) {
      inputErrors.password = '비밀번호는 최소 8자 이상, 최대 20자 이하여야 합니다.';
    }
    if (!nickname) {
      inputErrors.nickname = '닉네임을 입력하세요.';
    }
    if (!name) {
      inputErrors.name = '이름을 입력하세요.';
    }
    if (!birthDate) {
      inputErrors.birthDate = '생년월일을 입력하세요.';
    }
    if (!phoneNumber || !/^\d{10,11}$/.test(phoneNumber)) {
      inputErrors.phoneNumber = '유효한 전화번호를 입력하세요.';
    }
    return inputErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const inputErrors = validateInputs();
    if (Object.keys(inputErrors).length > 0) {
      setErrors(inputErrors);
      return;
    }

    try {
      const signupData = {
        userId: userId,
        password: password,
        nickname: nickname,
        name: name,
        birthDate: birthDate,
        phoneNumber: phoneNumber
      };

      // axios로 서버에 POST 요청
      // `YOUR_SPRING_SERVER_ENDPOINT`스프링 서버 엔드포인트로 대체
      const response = await axiox.post('YOUR_SPRING_SERVER_ENDPOINT', signupData);

      // 요청이 성공했을 때 로직
      console.log(response.data); // 서버로부터 받은 응답을 로그로 출력
      // 회원가입 성공 후 처리 로직 추가(로그인 페이지로 리다이렉트)
      navigate('/login');
    } catch (error) {
      // 요청이 실패했을 때 로직
      console.error('회원가입에 실패했습니다.', error);
      // 회원가입 실패 처리 로직 추가(에러 메시지 표시)
      setErrors({
        ...errors,
        apiError: error.response ? error.response.data.message : '회원가입 중 오류가 발생했습니다.'
      });
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="아이디"
        />
        {errors.userId && <div className="error-message">{errors.userId}</div>}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
        />
        {errors.password && <div className="error-message">{errors.password}</div>}
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임"
        />
        {errors.nickname && <div className="error-message">{errors.nickname}</div>}
        <input
          type="text"
          className='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름"
        />
        {errors.name && <div className="error-message">{errors.name}</div>}
        <div className='birthday-text'>생년월일</div>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
        {errors.birthDate && <div className="error-message">{errors.birthDate}</div>}
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="전화번호"
        />
        {errors.phoneNumber && <div className="error-message">{errors.phoneNumber}</div>}

        {errors.apiError && <div className="error-message">{errors.apiError}</div>} {/* 서버로부터의 응답이 실패했을 때 사용자에게 에러 메시지를 표시*/}

        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}

export default SignUp;
