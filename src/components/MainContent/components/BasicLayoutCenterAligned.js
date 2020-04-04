import React from 'react'

function BasicLayoutCenterAligned(props) {
    return (
        <main className="masthead text-light">
            <div className="row h-100 m-0 align-items-center">
                <div className="col text-center">
                    {props.children}
                </div>
            </div> 
        </main>
    )
}

export default BasicLayoutCenterAligned