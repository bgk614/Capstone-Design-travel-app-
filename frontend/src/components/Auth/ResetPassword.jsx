import React, { useState } from 'react';
import axiox from 'axios';
import '../../styles/LogInStyle/ResetPassword.css';

function ResetPassword() {
    const [Id, setId] = useState("");
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [sentCode, setSentCode] = useState("");
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [step, setStep] = useState(1); // 상태 관리: 1은 본인인증, 2는 비밀번호 재설정


    // 인증번호 요청
    const handleRequestVerificationCode = async () => {
        if (!phoneNumber.trim()) {
            setErrors({ phoneNumber: '전화번호를 입력하세요.' });
            return;
        }

        try {
            const response = await axiox.post('YOUR_ENDPOINT/send-code', { phoneNumber });
            if (response.data.success) {
                setSentCode(response.data.code);
                setErrors({});
                alert('인증번호가 발송되었습니다.');
            } else {
                setErrors({ codeError: '인증번호 발송 실패. 전화번호를 확인해주세요.' });
            }
        } catch (error) {
            setErrors({ codeError: '인증번호 발송 중 오류가 발생했습니다.' });
        }
    };

    // 인증번호 확인
    const handleConfirmVerificationCode = async () => {
        if (!Id.trim() || !phoneNumber.trim() || !verificationCode.trim()) {
            setErrors({
                Id: !Id.trim() ? '아이디를 입력하세요.' : '',
                name: !name.trim() ? '이름을 입력하세요.' : '',
                phoneNumber: !phoneNumber.trim() ? '전화번호를 입력하세요.' : '',
                verificationCode: !verificationCode.trim() ? '인증번호를 입력하세요.' : ''
            });
            return;
        }

        if (verificationCode !== sentCode) {
            setErrors({ verifyError: '입력하신 인증번호가 일치하지 않습니다.' });
            return;
        }

        try {
            const response = await axiox.post('YOUR_ENDPOINT/verify-user', { Id, name, phoneNumber, verificationCode });
            if (response.data.success) {
                setStep(2);
                setErrors({});
            } else {
                setErrors({ verifyError: '입력한 정보가 일치하지 않습니다.' });
            }
        } catch (error) {
            setErrors({ verifyError: '인증 확인 중 오류가 발생했습니다.' });
        }
    };

    // 비밀번호 재설정
    const handleResetPassword = async () => {
        if (newPassword.length < 8 || newPassword.length > 20) {
            setErrors({ newPassword: '비밀번호는 8자 이상, 20자 이하이어야 합니다.' });
            return;
        }

        if (newPassword !== confirmPassword) {
            setErrors({ confirmPassword: '비밀번호가 일치하지 않습니다.' });
            return;
        }

        try {
            const response = await axiox.post('YOUR_ENDPOINT/reset-password', { Id, newPassword });
            if (response.data.success) {
                alert('비밀번호가 성공적으로 재설정되었습니다.');
            } else {
                setErrors({ passwordError: '비밀번호 재설정 실패.' });
            }
        } catch (error) {
            setErrors({ passwordError: '비밀번호 재설정 중 오류가 발생했습니다.' });
        }
    };

    return (
        <div className="resetpassword-container">
            {step === 1 && (
                <form onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="text"
                        value={Id}
                        onChange={(e) => setId(e.target.value)}
                        placeholder="아이디"
                    />
                    {errors.Id && <div className="error-message">{errors.Id}</div>}
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="이름"
                    />
                    {errors.name && <div className="error-message">{errors.name}</div>}
                    <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="전화번호" />
                    {errors.phoneNumber && <div className="error-message">{errors.phoneNumber}</div>}
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

export default ResetPassword;
