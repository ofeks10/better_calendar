import React, { useState, useRef } from 'react'

import {
    Row,
    Col,
} from 'react-bootstrap'
import Calendar from 'react-calendar'

import EventViewer from './EventViewer.js'

import 'react-calendar/dist/Calendar.css';
import './stylesheets/CalendarMainView.css'

function CalendarMainView(props) {
    const [selectedDate, setSelectedDate] = useState(new Date())
    const myRef = useRef(null)

    const onDateChange = date => {
        setSelectedDate(date)
        myRef.current.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return(
        <Row noGutters className="content-row">
            <Col lg={3} className="h-100">
                {/* Widget */}
                <Calendar
                    onChange={onDateChange}
                    value={selectedDate}
                />
            </Col>
            <Col ref={myRef} lg={9} className="h-100 scrollable-content">
                {/* Viewer */}
                <EventViewer date={selectedDate} />
            </Col>
        </Row>
    )
}

export default CalendarMainView