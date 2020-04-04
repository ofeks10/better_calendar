import React from 'react'
import {Link} from 'react-router-dom'

function Brand() {
    return (
        <div className="container">
            <Link to="/" className="navbar-brand">Calendar Site</Link>
        </div>
    )
}

export default Brand