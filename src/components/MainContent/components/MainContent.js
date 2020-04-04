import React from 'react';
import {
    Switch,
    Route,
} from 'react-router-dom'

import BasicLayout from './BasicLayout.js'
import BasicLayoutCenterAligned from './BasicLayoutCenterAligned.js'
import MainPage from './MainPage/components/MainPage.js'
import MainPageModalOpener from './MainPage/components/MainPageModalOpener.js'
import CalendarContent from './CalendarContent/components/CalendarContent.js' 

function MainContent() {
    return (
        <Switch>
            <Route exact path="/" render={props => (
                <BasicLayoutCenterAligned>
                    <MainPage 
                        title="Calendar Site"
                        description="A quick and easy way to create a shareable calendar"
                    />
                    <MainPageModalOpener />
                </BasicLayoutCenterAligned>
            )} />
            <Route path="/about" render={props => (
                <BasicLayoutCenterAligned>
                    <h1>About Page</h1>
                </BasicLayoutCenterAligned>
            )} />
            <Route path="/contact" render={props => (
                <BasicLayoutCenterAligned>
                    <h1>Contact Page</h1>
                </BasicLayoutCenterAligned>
            )} />>            
            <Route path="/calendar/:hash" render={props => (
                <BasicLayout>
                    <CalendarContent {...props} />
                </BasicLayout>
            )}/>
        </Switch>
    )
}

export default MainContent