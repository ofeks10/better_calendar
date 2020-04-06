import React, {useState} from 'react'

import {
    Container,
} from 'react-bootstrap'

import CalendarTitle from './CalendarTitle.js'
import CalendarMainView from './CalendarMainView.js'

import './stylesheets/CalendarContent.css'

function CalendarContent(props) {
    const [shouldDisplayMainView, setShouldDisplayMainView] = useState(false)

    return (
        <Container fluid className="main-content">
            <CalendarTitle hash={props.match.params.hash} changeShouldDisplay={setShouldDisplayMainView}/>
            {shouldDisplayMainView && <CalendarMainView hash={props.match.params.hash} />}
        </Container>
    )
}

export default CalendarContent