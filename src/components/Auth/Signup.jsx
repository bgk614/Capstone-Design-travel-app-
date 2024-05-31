import React, { useState } from 'react';
import axiox from 'axios';  // Corrected typo here
import { useNavigate } from 'react-router-dom';
import '../../styles/LoginStyle/Signup.css';

const Server_IP = process.env.REACT_APP_Local_Server_IP;

function Signup() {
  const [userid, setuserid] = useState('');
  const [password, setpassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');
  const [phone, setphone] = useState('');
  const [email, setemail] = useState('');
  const [address, setaddress] = useState('');
  const [errors, setErrors] = useState({});
  const [isCheckinguserid, setIsCheckinguserid] = useState(false);
  const [isuseridAvailable, setIsuseridAvailable] = useState(null);
  const [isCheckingNickname, setIsCheckingNickname] = useState(false);
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(null);
  const navigate = useNavigate();

  function validateInputs() {
    const inputErrors = {};
    if (!userid) {
      inputErrors.userid = '아이디를 입력하세요.';
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    if (!passwordRegex.test(password)) {
      inputErrors.password = '비밀번호는 영어 대소문자, 숫자, 특수문자를 포함한 8~20자이어야 합니다.';
    }
    if (!nickname) {
      inputErrors.nickname = '닉네임을 입력하세요.';
    }
    if (!name) {
      inputErrors.name = '이름을 입력하세요.';
    }
    if (!phone || !/^010-\d{4}-\d{4}$/.test(phone)) {
      inputErrors.phone = '유효한 전화번호를 입력하세요.';
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      inputErrors.email = '유효한 이메일을 입력하세요.';
    }
    if (!address) {
      inputErrors.address = '주소를 입력하세요.';
    }
    return inputErrors;
  }

  const handleCheckuserid = async () => {
    const inputErrors = validateInputs();
    if (inputErrors.userid) {
      setErrors(inputErrors);
      return;
    }
    setIsCheckinguserid(true);
    try {
      const response = await axiox.post(`${Server_IP}/auth/check-userid/`, { userid });
      setIsuseridAvailable(response.data.available);
      setErrors({ ...errors, userid: response.data.available ? null : '중복된 아이디입니다.' });
    } catch (error) {
      console.error('아이디 중복 확인에 실패했습니다.', error);
      setErrors({ ...errors, userid: '아이디 중복 확인 중 오류가 발생했습니다.' });
    }
    setIsCheckinguserid(false);
  };

  const handleCheckNickname = async () => {
    const inputErrors = validateInputs();
    if (inputErrors.nickname) {
      setErrors(inputErrors);
      return;
    }
    setIsCheckingNickname(true);
    try {
      const response = await axiox.post(`${Server_IP}/auth/check-nickname/`, { nickname });
      setIsNicknameAvailable(response.data.available);
      setErrors({ ...errors, nickname: response.data.available ? null : '중복된 닉네임입니다.' });
    } catch (error) {
      console.error('닉네임 중복 확인에 실패했습니다.', error);
      setErrors({ ...errors, nickname: '닉네임 중복 확인 중 오류가 발생했습니다.' });
    }
    setIsCheckingNickname(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const inputErrors = validateInputs();

    if (isuseridAvailable === null) {
      inputErrors.userid = '아이디 중복 확인을 해주세요.';
    }
    if (isNicknameAvailable === null) {
      inputErrors.nickname = '닉네임 중복 확인을 해주세요.';
    }

    if (Object.keys(inputErrors).length > 0) {
      setErrors(inputErrors);
      return;
    }

    try {
      const signupData = {
        userid,
        password,
        nickname,
        name,
        phone,
        email,
        address
      };
      const response = await axiox.post(`${Server_IP}/auth/signup/`, signupData);
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      console.error('회원가입에 실패했습니다.', error);
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
          value={userid}
          onChange={(e) => setuserid(e.target.value)}
          placeholder="아이디"
        />
        <button type="button" onClick={handleCheckuserid} disabled={isCheckinguserid}>
          {isCheckinguserid ? '확인 중...' : '중복 확인'}
        </button>
        {errors.userid && <div className="error-message">{errors.userid}</div>}
        {isuseridAvailable && <div className="success-message">사용 가능한 아이디입니다.</div>}
        <input
          type="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          placeholder="비밀번호"
        />
        {errors.password && <div className="error-message">{errors.password}</div>}
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임"
        />
        <button type="button" onClick={handleCheckNickname} disabled={isCheckingNickname}>
          {isCheckingNickname ? '확인 중...' : '중복 확인'}
        </button>
        {errors.nickname && <div className="error-message">{errors.nickname}</div>}
        {isNicknameAvailable && <div className="success-message">사용 가능한 닉네임입니다.</div>}
        <input
          type="text"
          className='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름"
        />
        {errors.name && <div className="error-message">{errors.name}</div>}
        <input
          type="tel"
          value={phone}
          onChange={(e) => setphone(e.target.value)}
          placeholder="전화번호"
        />
        {errors.phone && <div className="error-message">{errors.phone}</div>}
        <input
          type="email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          placeholder="이메일"
        />
        {errors.email && <div className="error-message">{errors.email}</div>}
        <input
          type="text"
          value={address}
          onChange={(e) => setaddress(e.target.value)}
          placeholder="주소"
        />
        {errors.address && <div className="error-message">{errors.address}</div>}

        {errors.apiError && <div className="error-message">{errors.apiError}</div>} {/* 서버로부터의 응답이 실패했을 때 사용자에게 에러 메시지를 표시*/}

        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}

export default Signup;
