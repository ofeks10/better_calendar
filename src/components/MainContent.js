import React from 'react';
import {
    Switch,
    Route,
} from 'react-router-dom'

import BasicLayout from './BasicLayout.js'
import MainPage from './MainPage.js'
import MainPageModalOpener from './MainPageModalOpener.js'

function Calendar(props) {
    return (<div><br /><br /><h1> Hello {props.match.params.hash} </h1></div>)
}

function MainContent() {
    return (
        <Switch>
            <Route exact path="/" render={props => (
                <BasicLayout>
                    <MainPage 
                        title="Calendar Site"
                        description="A quick and easy way to create a shareable calendar"
                    />
                    <MainPageModalOpener />
                </BasicLayout>
            )} />
            <Route path="/about" render={props => (
                <BasicLayout>
                    <h1>About Page</h1>
                </BasicLayout>
            )} />
            <Route path="/contact" render={props => (
                <BasicLayout>
                    <h1>Contact Page</h1>
                </BasicLayout>
            )} />>            
            <Route path="/calendar/:hash" render={props => (
                <BasicLayout>
                    <Calendar {...props} />
                </BasicLayout>
            )} />
        </Switch>
    )
}

export default MainContent