import React, { useState } from 'react';
import axiox from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/LoginStyle/FindPassword.css';

const Server_IP = process.env.REACT_APP_Local_Server_IP;

function FindPassword() {
    const [userid, setuserid] = useState("");
    const [email, setemail] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [sentCode, setSentCode] = useState("");
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [step, setStep] = useState(1); // 상태 관리: 1은 본인인증, 2는 비밀번호 재설정
    const navigate = useNavigate();

    function validate() {
        const inputErrors = {};
        if (step === 1) {
            if (!userid.trim()) {
                inputErrors.userid = '아이디를 입력하세요.';
            }
            if (!email.trim()) {
                inputErrors.email = '이메일을 입력하세요.';
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                inputErrors.email = '유효한 이메일을 입력하세요.';
            }
            if (sentCode && !verificationCode.trim()) {
                inputErrors.verificationCode = '인증번호를 입력하세요.';
            }
        }
        if (step === 2) {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
            if (!passwordRegex.test(newPassword)) {
                inputErrors.newPassword = '비밀번호는 영어 대소문자, 숫자, 특수문자를 포함한 8~20자이어야 합니다.';
            }
            if (newPassword !== confirmPassword) {
                inputErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
            }
        }
        return inputErrors;
    }

    // 인증번호 요청
    const handleRequestVerificationCode = async () => {
        const inputErrors = validate();
        if (Object.keys(inputErrors).length > 0) {
            setErrors(inputErrors);
            return;
        }

        try {
            const response = await axiox.post(`${Server_IP}/auth/send-code/`, { userid, email });
            if (response.data.code) {
                setSentCode(response.data.code);
                setErrors({});
                alert('인증번호가 발송되었습니다.');
            } else {
                setErrors({ codeError: '인증번호 발송 실패. 이메일을 확인해주세요.' });
                setemail("");
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrors({ codeError: error.response.data.detail || '제공된 아이디와 이메일이 등록된 정보와 일치하지 않습니다.' });
                setuserid("");
                setemail("");
            } else {
                setErrors({ codeError: '인증번호 발송 중 오류가 발생했습니다.' });
                setuserid("");
                setemail("");
            }
        }
    };

    // 인증번호 확인
    const handleConfirmVerificationCode = async () => {
        const inputErrors = validate();
        if (Object.keys(inputErrors).length > 0) {
            setErrors(inputErrors);
            return;
        }

        if (!sentCode) {
            setErrors({ codeError: '인증번호를 요청하세요.' });
            return;
        }

        if (verificationCode !== sentCode) {
            setErrors({ verifyError: '입력하신 인증번호가 일치하지 않습니다.' });
            setVerificationCode("");
            return;
        }

        try {
            const response = await axiox.post(`${Server_IP}/auth/verify-user/`, { userid, email, verificationCode });
            if (response.data.success) {
                setStep(2);
                setErrors({});
            } else {
                setErrors({ verifyError: '입력한 정보가 일치하지 않습니다.' });
                setVerificationCode("");
            }
        } catch (error) {
            setErrors({ verifyError: '인증 확인 중 오류가 발생했습니다.' });
            setVerificationCode("");
        }
    };

    // 비밀번호 재설정
    const handleResetPassword = async () => {
        const inputErrors = validate();
        if (Object.keys(inputErrors).length > 0) {
            setErrors(inputErrors);
            return;
        }

        try {
            const response = await axiox.post(`${Server_IP}/auth/reset-password/`, { userid, newPassword });
            if (response.data.success) {
                alert('비밀번호가 성공적으로 재설정되었습니다.');
                setErrors({});
                navigate('/login');
            } else {
                setErrors({ passwordError: '비밀번호 재설정 실패.' });
                setNewPassword("");
                setConfirmPassword("");
            }
        } catch (error) {
            setErrors({ passwordError: '비밀번호 재설정 중 오류가 발생했습니다.' });
            setNewPassword("");
            setConfirmPassword("");
        }
    };

    return (
        <div className="resetpassword-container">
            {step === 1 && (
                <form onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="text"
                        value={userid}
                        onChange={(e) => setuserid(e.target.value)}
                        placeholder="아이디"
                    />
                    {errors.userid && <div className="error-message">{errors.userid}</div>}
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        placeholder="이메일" />
                    {errors.email && <div className="error-message">{errors.email}</div>}
                    <button onClick={handleRequestVerificationCode}>인증번호 요청</button>
                    <input
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        placeholder="인증번호"
                    />
                    <button onClick={handleConfirmVerificationCode}>인증</button>
                    {errors.codeError && <p className="error-message">{errors.codeError}</p>}
                    {errors.verifyError && <p className="error-message">{errors.verifyError}</p>}
                </form>
            )}
            {step === 2 && (
                <form onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="새 비밀번호" />
                    {errors.newPassword && <div className="error-message">{errors.newPassword}</div>}
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="새 비밀번호 재입력" />
                    {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
                    <button onClick={handleResetPassword}>비밀번호 재설정</button>
                    {errors.passwordError && <p className="error-message">{errors.passwordError}</p>}
                </form>
            )}
        </div>
    );
}

export default FindPassword;