import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
    return (
        <div className="navbar">
            <div className="navbar__links">
                <NavLink to="/about"> О сайте</NavLink>
                <NavLink to="/posts"> Посты</NavLink>
            </div>
        </div>
    )
}

export default Navbar
