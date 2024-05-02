import React from "react"
import '../../../styles/HeaderStyle/MakePlanButton.css'
import { NavLink } from "react-router-dom"

export default function MakeplanButton() {
    return (
            <nav>
                <NavLink className="MakeplanButton" to='/makeplan'>
                    Let's make plan
                </NavLink>
            </nav>
    )
}
