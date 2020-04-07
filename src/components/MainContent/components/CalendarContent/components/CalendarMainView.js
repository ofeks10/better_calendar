import React, { useState } from 'react'

import {
    Row,
} from 'react-bootstrap'

import EventViewer from './EventViewer.js'
import CalendarWidget from './CalendarWidget.js'

import 'react-calendar/dist/Calendar.css'
import './stylesheets/CalendarMainView.css'

function CalendarMainView(props) {
    const [selectedDate, setSelectedDate] = useState(new Date())

    const onDateChange = date => {
        setSelectedDate(date)
    }

    return(
        <Row noGutters className="content-row">
            <CalendarWidget onDateChange={onDateChange} selectedDate={selectedDate} />
            <EventViewer date={selectedDate} />
        </Row>
    )
}

export default CalendarMainView