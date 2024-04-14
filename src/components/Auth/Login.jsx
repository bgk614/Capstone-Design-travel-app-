import React, { useState } from 'react';
import axiox from 'axios';
import '../../styles/LoginStyle/Login.css'; 
// import { useDispatch } from 'react-redux';
// import { loginUser } from '../../../_actions/user_action';


function Login() {
        const [Id, setId] = useState("");
        const [Password, setPassword] = useState("");

        const onIdHandler = (event) => {
            setId(event.currentTarget.value);
        };
    
        const onPasswordHandler = (event) => {
            setPassword(event.currentTarget.value);
        };
    
        const onSubmitHandler = async (event) => {
            event.preventDefault();
            try {
              // 스프링 백엔드의 로그인 엔드포인트로 POST 요청 보내기
              const response = await axiox.post('YOUR_SPRING_SERVER_ENDPOINT/login', {
                username: Id, // 백엔드에서 사용하는 파라미터 이름에 맞추기
                password: Password
              });
        
              // 로그인 성공 처리
              console.log(response.data);
              // 예를 들어 로그인 후 토큰을 localStorage에 저장하거나 상태 관리 라이브러리에 저장
              // localStorage.setItem('token', response.data.token);
        
              // 로그인 성공 후 페이지 리다이렉션
              // history.push('/home'); // 'react-router-dom'의 useHistory 훅 사용시
        
            } catch (error) {
              // 로그인 실패 처리
              console.error('로그인 실패:', error);
            }
        };
    
    return (
        <div className="form-container">
        <form className="login-form" onSubmit={onSubmitHandler}>
            <input 
                type='text' 
                className='form' 
                value={Id} 
                onChange={onIdHandler}
                placeholder="아이디"
            />
            <input type='password' 
                className='form' 
                value={Password} 
                onChange={onPasswordHandler}
                placeholder="비밀번호"
            />
            <button className="button-login" formAction=''>
                로그인
            </button>
        </form>
    </div>
);
}

export default Login;
