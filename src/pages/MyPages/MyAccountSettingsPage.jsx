import React, { useState, useEffect } from "react";
import MyPageNav from "../../components/MyPageNavBar";
import axios from 'axios';
import '../../styles/PageStyle/MyPageStyle/MyAccountSettingsPage.css'; 

export default function MyAccountSettingsPage() {
    const [user, setUser] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        zipcode: ''
    });

    // 사용자 정보를 불러오는 함수
    useEffect(() => {
        axios.get('http://localhost:8080/api/users/me')
            .then(response => {
                setUser(response.data);
            })
            .catch(error => console.error("Error fetching user data", error));
    }, []);

    // 사용자 정보를 업데이트하는 함수
    function handleChange(e) {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        axios.put('http://localhost:8080/api/users/me', user)
            .then(response => {
                alert('User updated successfully');
            })
            .catch(error => {
                alert('Error updating user');
                console.error("Error updating user", error);
            });
    }

    return (
        <div className="account-settings">
            <h1>My Account</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" value={user.name || ''} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Phone:</label>
                    <input type="text" name="phone" value={user.phone || ''} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={user.email || ''} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Address:</label>
                    <input type="text" name="address" value={user.address || ''} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Zip Code:</label>
                    <input type="text" name="zipcode" value={user.zipcode || ''} onChange={handleChange} />
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
}
