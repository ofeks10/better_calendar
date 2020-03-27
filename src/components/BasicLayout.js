import React from 'react'

function BasicLayout(props) {
    return (
        <main className="masthead text-light">
            <div className="row h-100 m-0 align-items-center">
                <div className="col-12 text-center">
                    {props.children}
                </div>
            </div> 
        </main>
    )
}

export default BasicLayout