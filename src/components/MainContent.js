import React, {useState, useEffect} from 'react';
import {
    Switch,
    Route,
} from 'react-router-dom'

import BasicLayout from './BasicLayout.js'
import MainPage from './MainPage.js'
import MainPageModalOpener from './MainPageModalOpener.js'

const axios = require('axios');

async function getCalendarTitle(hash) {
    try{
        const {data} = await axios.get('/calendar?calendar_hash=' + hash)
        if (!data.success) {
            return data.error_msg
        } else {
            console.log(data.title)
            return data.title
        }
    } catch(error) {
        console.log(error)
    }
}

function Calendar(props) {
    const [calendarTitle, setCalendarTitle] = useState("")

    useEffect(() => {
        async function getData(hash) {
            const title = await getCalendarTitle(hash)
            console.log(title)
            setCalendarTitle(title)
        }
        getData(props.match.params.hash)
    }, [props.match.params.hash])

    return (
        <div>
            <h1>{calendarTitle}</h1>
        </div>
    )
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