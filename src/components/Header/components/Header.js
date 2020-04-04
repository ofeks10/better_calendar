import React from 'react';

import Brand from './NavBar/components/Brand.js'
import NavBarLinks from './NavBar/components/NavBarLinks.js'


function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow fixed-top">
            <Brand />
            <NavBarLinks />
        </nav>
    );
}

export default Header;