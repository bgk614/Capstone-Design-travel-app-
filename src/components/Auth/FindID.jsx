import React, { useState } from 'react';
import axiox from 'axios';
import '../../styles/LogInStyle/FindID.css';

function FindID() {
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [sentCode, setSentCode] = useState("");
    const [foundId, setFoundId] = useState("");
    const [errors, setErrors] = useState({});
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    };

    const onPhoneNumberHandler = (event) => {
        setPhoneNumber(event.currentTarget.value);
    };

    const onVerificationCodeHandler = (event) => {
        setVerificationCode(event.currentTarget.value);
    };

    function validate () {
        const inputErrors = {};
        if (!name) {
            inputErrors.name = '이름을 입력하세요.';
        }
        if (!phoneNumber || !/^\d{10,11}$/.test(phoneNumber)) {
            inputErrors.phoneNumber = '유효한 전화번호를 입력하세요.';
        }
        if (!verificationCode && isCodeSent) {
            inputErrors.verificationCode = '인증코드를 입력하세요.';
        }
        return inputErrors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const inputErrors = validate();
        if (Object.keys(inputErrors).length > 0) {
            setErrors(inputErrors);
            return;
        }

        try {
            if (!isCodeSent) {
                // 인증번호 요청
                const response = await axiox.post('YOUR_SPRING_SERVER_ENDPOINT/send-code', { phoneNumber });
                setSentCode(response.data.code);
                setIsCodeSent(true);
            } else {
                // 인증번호 확인 및 아이디 찾기
                if (verificationCode !== sentCode) {
                    setErrors({ verificationCode: '인증번호가 일치하지 않습니다.' });
                    return;
                }
                const response = await axiox.post('YOUR_SPRING_SERVER_ENDPOINT/verify-code', { phoneNumber, name, verificationCode });
                if (response.data.success) {
                    setFoundId(response.data.userId);
                    setIsVerified(true);
                } else {
                    setErrors({ formError: response.data.message || '등록된 정보가 없습니다.' });
                    setIsVerified(false);
                }
            }
            setErrors({});
        } catch (error) {
            console.error('요청 실패:', error);
            setErrors({ apiError: '요청에 실패했습니다. 다시 시도하세요.' });
        }
    };

    return (
        <div className="findid-container">
            <form className="findid-form"onSubmit={handleSubmit}>
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
                        type="tel"
                        value={phoneNumber}
                        onChange={onPhoneNumberHandler}
                        placeholder="전화번호"
                        disabled={isVerified}
                    />
                    <button className="button-send-code" type="button" onClick={handleSubmit} disabled={isCodeSent || isVerified}>
                        인증번호 요청
                    </button>
                    {errors.phoneNumber && <div className="error-message">{errors.phoneNumber}</div>}
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        value={verificationCode}
                        onChange={onVerificationCodeHandler}
                        placeholder="인증번호 6자리"
                    />
                    <button className="button-verify-code"type="button" onClick={handleSubmit}>
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
            {isVerified && (
                <div className="found-id">
                    <p>아이디: {foundId}</p>
                </div>
            )}
        </div>
    );
}

export default FindID;
