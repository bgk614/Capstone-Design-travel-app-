import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/LoginStyle/FindID.css';

const Server_IP = process.env.REACT_APP_Local_Server_IP;

function FindID() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [sentCode, setSentCode] = useState("");
    const [foundId, setFoundId] = useState("");
    const [errors, setErrors] = useState({});
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    };

    const onPhoneHandler = (event) => {
        setPhone(event.currentTarget.value);
    };

    const onVerificationCodeHandler = (event) => {
        setVerificationCode(event.currentTarget.value);
    };

    function validate () {
        const inputErrors = {};
        if (!name) {
            inputErrors.name = '이름을 입력하세요.';
        }
        if (!phone || !/^010-\d{4}-\d{4}$/.test(phone)) {
            inputErrors.phone = '유효한 전화번호를 입력하세요.';
        }
        if (!verificationCode && isCodeSent) {
            inputErrors.verificationCode = '인증코드를 입력하세요.';
        }
        return inputErrors;
    };

    const handleSendCode = async () => {
        const inputErrors = validate();
        if (Object.keys(inputErrors).length > 0) {
            setErrors(inputErrors);
            return;
        }

        try {
            const response = await axios.post(`${Server_IP}/send-code/`, { phone });
            setSentCode(response.data.code);
            setIsCodeSent(true);
            setVerificationCode("");
            setErrors({});
            console.log('인증번호가 전송되었습니다:', response.data.code);
        } catch (error) {
            console.error('인증번호 요청 실패:', error);
            setErrors({ apiError: '인증번호 요청에 실패했습니다. 다시 시도하세요.' });
        }
    };

    const handleVerifyCode = async () => {
        if (verificationCode !== sentCode) {
            setErrors({ verificationCode: '인증번호가 일치하지 않습니다.' });
            return;
        }

        try {
            const response = await axios.post(`${Server_IP}/verify-code/`, { phone, name, verificationCode });
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

        if (!isVerified) {
            setErrors({ verificationCode: '인증을 완료하세요.' });
            return;
        }

        try {
            const response = await axios.post(`${Server_IP}/find-id/`, { name, phone });
            setFoundId(response.data.userId);
            setErrors({});
            console.log('아이디를 성공적으로 찾았습니다:', response.data.userId);
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
                        type="tel"
                        value={phone}
                        onChange={onPhoneHandler}
                        placeholder="전화번호"
                        disabled={isVerified}
                    />
                    <button className="button-send-code" type="button" onClick={handleSendCode}>
                        인증번호 요청
                    </button>
                    {errors.phone && <div className="error-message">{errors.phone}</div>}
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        value={verificationCode}
                        onChange={onVerificationCodeHandler}
                        placeholder="인증번호 6자리"
                        disabled={!isCodeSent || isVerified}
                    />
                    <button className="button-verify-code" type="button" onClick={handleVerifyCode} disabled={!isCodeSent || isVerified}>
                        인증
                    </button>
                    {isVerified && <div className="verification-success">✔</div>}
                    {errors.verificationCode && <div className="error-message">{errors.verificationCode}</div>}
                </div>
                <button className="button-find-id" type="submit" disabled={!isVerified}>
                    아이디 찾기
                </button>
                {errors.apiError && <div className="error-message">{errors.apiError}</div>}
            </form>
            {foundId && (
                <div className="found-id">
                    <p>아이디: {foundId}</p>
                </div>
            )}
        </div>
    );
}

export default FindID;