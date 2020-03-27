import React from 'react';
import {
    Switch,
    Route,
} from 'react-router-dom'

import BasicLayout from './BasicLayout.js'
import MainPage from './MainPage.js'

function Calendar(props) {
    return (<h1> hello {props.hash} </h1>)
}

function MainContent() {
    return (
        <main className="masthead text-light">
            <Switch>
                <Route exact path="/" render={props => (
                    <BasicLayout>
                        <MainPage 
                            title="Calendar Site"
                            description="A quick and easy way to create a shareable calendar"
                        />
                    </BasicLayout>
                )} />
                <Route path="/about">
                    <h1>About Page</h1>
                </Route>
                <Route path="/contact">
                    <h1>Contact Page</h1>
                </Route>
                <Route path="/calendar/:hash" Component={Calendar} />
            </Switch>
        </main>
    )
}

export default MainContent