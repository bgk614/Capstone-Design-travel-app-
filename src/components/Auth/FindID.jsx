import React, { useState, useEffect } from 'react';
import axiox from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/LoginStyle/FindID.css';

const Server_IP = process.env.REACT_APP_Local_Server_IP;

function FindID() {
    const [name, setName] = useState("");
    const [email, setemail] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [sentCode, setSentCode] = useState("");
    const [foundId, setFoundId] = useState("");
    const [errors, setErrors] = useState({});
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (foundId) {
            alert(`아이디: ${foundId}`);
            navigate('/login');
        }
    }, [foundId, navigate]);

    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    };

    const onemailHandler = (event) => {
        setemail(event.currentTarget.value);
    };

    const onVerificationCodeHandler = (event) => {
        setVerificationCode(event.currentTarget.value);
    };

    function validate () {
        const inputErrors = {};
        if (!name) {
            inputErrors.name = '이름을 입력하세요.';
        }
        if (!email) {
            inputErrors.email = '이메일을 입력하세요.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            inputErrors.email = '유효한 이메일을 입력하세요.';
        }
        if (!verificationCode && isCodeSent) {
            inputErrors.verificationCode = '인증코드를 입력하세요.';
        }
        return inputErrors;
    };

    const handleSendCode = async () => {
        const inputErrors = validate();
        if (Object.keys(inputErrors).length > 0 && inputErrors.email !== '인증번호를 요청하세요.') {
            setErrors(inputErrors);
            return;
        }

        try {
            const response = await axiox.post(`${Server_IP}/auth/send-code/`, { name, email });
            setSentCode(response.data.code);
            setIsCodeSent(true);
            setVerificationCode("");
            setErrors({});
            alert('인증번호가 발송되었습니다.');
        } catch (error) {
            console.error('인증번호 요청 실패:', error);
            setErrors({ apiError: error.response?.data?.detail || '인증번호 요청에 실패했습니다. 다시 시도하세요.' });
        }
    };

    const handleVerifyCode = async () => {
        if (!sentCode) {
            setErrors({ apiError: '인증번호를 요청하세요.' });
            return;
        }

        const inputErrors = validate();
        if (Object.keys(inputErrors).length > 0) {
            setErrors(inputErrors);
            return;
        }
        
        if (verificationCode !== sentCode) {
            setErrors({ verificationCode: '인증번호가 일치하지 않습니다.' });
            setVerificationCode("");
            return;
        }
        
        try {
            const response = await axiox.post(`${Server_IP}/auth/verify-code/`, { email, verificationCode });
            if (response.data.success) {
                setIsVerified(true);
                setErrors({});
                console.log('인증이 성공적으로 완료되었습니다.');
            } else {
                setErrors({ formError: response.data.message || '등록된 정보가 없습니다.' });
                setIsVerified(false);
            }
        } catch (error) {
            console.error('인증 실패:', error);
            setErrors({ apiError: '인증에 실패했습니다. 다시 시도하세요.' });
        }
    };

    const handleFindId = async (event) => {
        event.preventDefault();

        const inputErrors = validate();
        if (Object.keys(inputErrors).length > 0) {
            setErrors(inputErrors);
        }

        if (!isVerified) {
            setErrors(prevErrors => ({ ...prevErrors, verificationCode: '인증을 완료하세요.' }));
            return;
        }

        if (Object.keys(inputErrors).length > 0) {
            return;
        }

        try {
            const response = await axiox.post(`${Server_IP}/auth/find-id/`, { name, email });
            setFoundId(response.data.userid);
            setErrors({});
        } catch (error) {
            console.error('아이디 찾기 실패:', error);
            setErrors({ apiError: '아이디 찾기에 실패했습니다. 다시 시도하세요.' });
        }
    };

    return (
        <div className="findid-container">
            <form className="findid-form" onSubmit={handleFindId}>
                <div className="form-group">
                    <input
                        type="text"
                        value={name}
                        onChange={onNameHandler}
                        placeholder="이름"
                        disabled={isVerified}
                    />
                    {errors.name && <div className="error-message">{errors.name}</div>}
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        value={email}
                        onChange={onemailHandler}
                        placeholder="이메일"
                        disabled={isVerified}
                    />
                    <button className="button-send-code" type="button" onClick={handleSendCode}>
                        인증번호 요청
                    </button>
                    {errors.email && <div className="error-message">{errors.email}</div>}
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        value={verificationCode}
                        onChange={onVerificationCodeHandler}
                        placeholder="인증번호 6자리"
                    />
                    <button className="button-verify-code" type="button" onClick={handleVerifyCode}>
                        인증
                    </button>
                    {isVerified && <div className="verification-success">✔</div>}
                    {errors.verificationCode && <div className="error-message">{errors.verificationCode}</div>}
                </div>
                <button className="button-find-id" type="submit">
                    아이디 찾기
                </button>
                {errors.apiError && <div className="error-message">{errors.apiError}</div>}
            </form>
        </div>
    );
}

export default FindID;