import React from 'react';

import {NavLink} from 'react-router-dom'

function NavBarLinks() {
    return (
        <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
                <NavLink exact to="/" className="nav-link" activeClassName="active">
                    Home
                </NavLink>
                <NavLink to="/about" className="nav-link" activeClassName="active">
                    About
                </NavLink>
                <NavLink to="/contact" className="nav-link" activeClassName="active">
                    Contact
                </NavLink>
            </ul>
        </div>
    )
}

export default NavBarLinks