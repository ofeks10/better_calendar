import React from 'react'

function BasicLayout(props) {
    return (
        <div className="row h-100 align-items-center">
            <div className="col-12 text-center">
                {props.children}
            </div>
        </div>
    )
}

export default BasicLayout