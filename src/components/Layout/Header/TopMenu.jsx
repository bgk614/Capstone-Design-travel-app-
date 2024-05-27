import React, { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import '../../../styles/HeaderStyle/TopNav.css'
import { AuthContext } from '../../../App';


export default function TopMenu() {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsAuthenticated(false);
        navigate('/');
    };

    return (
            <div className="topmenu">
                <Link className="menu-link" to='/mypage'>
                    MY PAGE
                </Link>
                <Link className="menu-link" to='/mylike'>
                    MY LIKE
                </Link>
                <Link className="menu-link" to='/myplan'>
                    MY PLAN
                </Link>
                {isAuthenticated ? (
                    <Link className="menu-link" to='/' onClick={handleLogout}>
                        LOGOUT
                    </Link>
                ) : (
                    <Link className="menu-link" to='/login'>
                        LOGIN
                    </Link>
                )}
            </div> 
    );
}
