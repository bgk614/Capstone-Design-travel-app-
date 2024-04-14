import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/LoginStyle/Signup.css'; 

function Signup() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

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
      const response = await axios.post('YOUR_SPRING_SERVER_ENDPOINT', signupData);

      // 요청이 성공했을 때 로직
      console.log(response.data); // 서버로부터 받은 응답을 로그로 출력
      // 회원가입 성공 후 처리 로직 추가(로그인 페이지로 리다이렉트)
    } catch (error) {
      // 요청이 실패했을 때 로직
      console.error('회원가입에 실패했습니다.', error);
      // 회원가입 실패 처리 로직 추가(에러 메시지 표시)
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
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
        />
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임"
        />
        <input
          type="text"
          className='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름"
        />
        <div className='birthday-text'>생년월일</div>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="전화번호"
        />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}

export default Signup;
