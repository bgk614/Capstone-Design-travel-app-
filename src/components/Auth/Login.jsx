import React, { useState } from 'react';
import axiox from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/LoginStyle/Login.css'; 
// import { useDispatch } from 'react-redux';
// import { loginUser } from '../../../_actions/user_action';

function Login() {
        const [Id, setId] = useState("");
        const [Password, setPassword] = useState("");
        const [errorMessage, setErrorMessage] = useState("");
        const [isLoading, setIsLoading] = useState(false); // 비동기 요청의 로딩 상태 관리
        const navigate = useNavigate(); // useNavigate 훅 사용

        const onIdHandler = (event) => {
            setId(event.currentTarget.value);
        };
    
        const onPasswordHandler = (event) => {
            setPassword(event.currentTarget.value);
        };
        
        function validateInputs () {
            if (Id.trim() === "") {
                setErrorMessage("아이디를 입력하세요.");
                return false;
            }
            if (Password === "") {
                setErrorMessage("비밀번호를 입력하세요.");
                return false;
            }
            return true;
        }

        const onSubmitHandler = async (event) => {
            event.preventDefault();
            setErrorMessage(""); // 초기화
            if(!validateInputs()) {
                console.log("유효성 검사 실패");
                return;
            }
            setIsLoading(true);
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
              navigate('/home'); // useNavigate 훅 사용

            } catch (error) {
              // 로그인 실패 처리
              console.error('로그인 실패:', error);
              if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message || '로그인에 실패했습니다. 다시 시도하세요.');
              } else {
                setErrorMessage('로그인에 실패했습니다. 다시 시도하세요.');
              }
            }
            setIsLoading(false);
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
                disabled={isLoading}
            />
            <input type='password' 
                className='form' 
                value={Password} 
                onChange={onPasswordHandler}
                placeholder="비밀번호"
                autoComplete="current-password"
                disabled={isLoading}
            />
            <button className="button-login" type="submit" disabled={isLoading}>
                {isLoading ? "로딩 중..." : "로그인"}
            </button>
        </form>
        {errorMessage && (<p className="error-message" aria-live="assertive">{errorMessage}</p>)}
    </div>
);
}

export default Login;
