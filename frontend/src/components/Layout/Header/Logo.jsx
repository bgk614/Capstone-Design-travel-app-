import React from "react"
import '../../../styles/HeaderStyle/Logo.css'
import { Link } from "react-router-dom"

export default function Logo() {
    return (
            <div>
                <Link className="Logo" to='/'>
                    <span class="travel">TRAVEL</span><br/>
                    <span class="maker">MAKER</span>
                </Link>
            </div>
            
    )
}