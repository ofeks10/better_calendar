import React, {useState, useRef} from 'react'

import {
    Container,
} from 'react-bootstrap'

import CalendarTitle from './CalendarTitle.js'
import CalendarMainView from './CalendarMainView.js'

import './stylesheets/CalendarContent.css'

function CalendarContent(props) {
    return (
        <Container fluid className="main-content">
            <CalendarTitle hash={props.match.params.hash} />
            <CalendarMainView hash={props.match.params.hash} />
        </Container>
    )
}

export default CalendarContent