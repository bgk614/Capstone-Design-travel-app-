import React, { useState } from 'react';
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
    
        const onSubmitHandler = (event) => {
            event.preventDefault();
            console.log('Id:', Id);
            console.log('Password:', Password);
        };
    
    return (
        <div className="form-container">
        <form className="login-form" onSubmit={onSubmitHandler}>
            <input 
                type='id' 
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
