import React from "react"
import { Link } from "react-router-dom";
import '../../../styles/HeaderStyle/Navbar.css';

export default function Navbar() {
    return (
        <div>
            <div className="navbar">
                    <Link className="nav-link" to='/best'>
                        BEST
                    </Link>
                    <Link className="nav-link" to='/board'>
                        BOARD
                    </Link>
                    <Link className="nav-link" to='/destinations'>
                        DESTINATIONS
                    </Link>
                    <Link className="nav-link" to='/faq'>
                        FAQ
                    </Link>
            </div> 
        </div>
    );
}
