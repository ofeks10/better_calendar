import React from 'react'

function MainPage(props) {
    return (
        <div>
            <h1 className="font-weight-light">{props.title}</h1>
            <p className="lead">{props.description}</p>
        </div>
    )
}

export default MainPage