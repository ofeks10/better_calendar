import React, {useState} from 'react';

import Brand from './Brand.js'
import NavBarLinks from './NavBarLinks.js'


function Header() {
    const [activeLink, setActiveLink] = useState(false)

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow fixed-top">
            <Brand />
            <NavBarLinks />
        </nav>
    );
}

export default Header;