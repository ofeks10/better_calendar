import React, {useState, useEffect} from 'react'

import {
    Container,
    Row,
    Col,
} from 'react-bootstrap'
import Calendar from 'react-calendar'

import EventViewer from './EventViewer.js'

import 'react-calendar/dist/Calendar.css';
import './CalendarContent.css'

const axios = require('axios')

async function getCalendarTitle(hash) {
    try {
        const { data } = await axios.get('/calendar?calendar_hash=' + hash)
        if (!data.success) {
            return data.error_msg
        } else {
            console.log(data.title)
            return data.title
        }
    } catch (error) {
        console.log(error)
    }
}

function CalendarContent(props) {
    const [calendarTitle, setCalendarTitle] = useState("")
    const [isCalendarTitleLoading, setCalendarTitleLoading] = useState(true)
    const [selectedDate, setSelectedDate] = useState(new Date())

    useEffect(() => {
        async function getData(hash) {
            const title = await getCalendarTitle(hash)
            setCalendarTitle(title)
            setCalendarTitleLoading(false)
        }
        getData(props.match.params.hash)
    }, [props.match.params.hash])

    const onDateChange = date => {
        setSelectedDate(date)
        console.log(date)
    }

    return (
        <Container fluid className="main-content">
            <Row className="title-row">
                <Col>
                    <h2>{isCalendarTitleLoading ? "Loading..." : calendarTitle}</h2>
                </Col>
            </Row>
            <Row noGutters className="content-row">
                <Col lg={3} className="h-100">
                    {/* Widget */}
                    <Calendar 
                        onChange={onDateChange}
                        value={selectedDate}
                    />
                </Col>
                <Col lg={9} className="h-100 scrollable-content">
                    {/* Viewer */}
                    <EventViewer date={selectedDate} />
                </Col>
            </Row>
        </Container>
    )
}

export default CalendarContent