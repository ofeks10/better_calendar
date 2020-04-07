import React, {useState} from 'react'

import {
    Container,
} from 'react-bootstrap'

import CalendarTitle from './CalendarTitle.js'
import CalendarMainView from './CalendarMainView.js'

import './stylesheets/CalendarContent.css'

function CalendarContent(props) {
    const [shouldDisplayMainView, setShouldDisplayMainView] = useState(false)
    const {hash} = props.match.params

    return (
        <Container fluid className="main-content">
            <CalendarTitle hash={hash} changeShouldDisplay={setShouldDisplayMainView}/>
            {shouldDisplayMainView && <CalendarMainView hash={hash} />}
        </Container>
    )
}

export default CalendarContent