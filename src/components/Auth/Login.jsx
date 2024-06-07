import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/LoginStyle/Login.css'; 
// import { useDispatch } from 'react-redux';
// import { loginUser } from '../../../_actions/user_action';
import { AuthContext } from '../../App';

const Server_IP = process.env.REACT_APP_Local_Server_IP;

function Login() {
        const [userid, setuserid] = useState("");
        const [password, setpassword] = useState("");
        const [errorMessage, setErrorMessage] = useState("");
        const [isLoading, setIsLoading] = useState(false); // 비동기 요청의 로딩 상태 관리
        const navigate = useNavigate(); // useNavigate 훅 사용
        const { setIsAuthenticated } = useContext(AuthContext);

        const onuseridHandler = (event) => {
            setuserid(event.currentTarget.value);
        };
    
        const onpasswordHandler = (event) => {
            setpassword(event.currentTarget.value);
        };
        
        function valuseridateInputs () {
            if (userid.trim() === "") {
                setErrorMessage("아이디를 입력하세요.");
                return false;
            }
            if (password === "") {
                setErrorMessage("비밀번호를 입력하세요.");
                return false;
            }
            return true;
        }

        const onSubmitHandler = async (event) => {
            event.preventDefault();
            setErrorMessage(""); // 초기화
            if(!valuseridateInputs()) {
                console.log("유효성 검사 실패");
                return;
            }
            setIsLoading(true);
            try {
              // 스프링 백엔드의 로그인 엔드포인트로 POST 요청 보내기
              const response = await axios.post(`${Server_IP}/auth/login/`, {
                userid: userid, // 백엔드에서 사용하는 파라미터 이름에 맞추기
                password: password
              });
        
              // 로그인 성공 처리
              console.log(response.data);
              // JWT 토큰 저장
              localStorage.setItem('token', response.data.access_token);
              axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
              setIsAuthenticated(true);
              // 로그인 성공 후 페이지 리다이렉션
              // history.push('/home'); // 'react-router-dom'의 useHistory 훅 사용시
              navigate('/'); // useNavigate 훅 사용

            } catch (error) {
              // 로그인 실패 처리
              console.error('로그인 실패:', error);
                if (error.response && error.response.data) {
                    setErrorMessage(error.response.data.message || '로그인에 실패했습니다. 다시 시도하세요.');
                } else {
                    setErrorMessage('로그인에 실패했습니다. 다시 시도하세요.');
                }
                setuserid("");
                setpassword("");
            }
            setIsLoading(false);
        };
    
    return (
        <div className="form-container">
        <form className="login-form" onSubmit={onSubmitHandler}>
            <input 
                type='text' 
                className='form' 
                value={userid} 
                onChange={onuseridHandler}
                placeholder="아이디"
                disabled={isLoading}
            />
            <input type='password' 
                className='form' 
                value={password} 
                onChange={onpasswordHandler}
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
