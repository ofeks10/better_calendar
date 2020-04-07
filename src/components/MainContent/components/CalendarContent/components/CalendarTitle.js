import React, { useState, useEffect } from 'react'

import { 
    Row,
    Col
} from 'react-bootstrap'

import getCalendarTitle from './server/GetCalendarTitle.js'

function CalendarTitle(props) {
    const [calendarTitle, setCalendarTitle] = useState("")
    const [isCalendarTitleLoading, setCalendarTitleLoading] = useState(true)

    useEffect(async () => {
        const { success, data } = await getCalendarTitle(props.hash)
        props.changeShouldDisplay(success)
        setCalendarTitle(data)
        setCalendarTitleLoading(false)
    }, [props.hash, props.changeShouldDisplay])

    return (
        <Row className="title-row">
            <Col>
                <h2>{isCalendarTitleLoading ? "Loading..." : calendarTitle}</h2>
            </Col>
        </Row>
    )
}

export default CalendarTitle