import React, { useState, useEffect } from 'react'

import { 
    Row,
    Col
} from 'react-bootstrap'

import getCalendarTitle from './server/GetCalendarTitle.js'

function CalendarTitle(props) {
    const [calendarTitle, setCalendarTitle] = useState("")
    const [isCalendarTitleLoading, setCalendarTitleLoading] = useState(true)

    useEffect(() => {

        async function getTitle (hash, changeShouldDisplay) {
            const { success, data } = await getCalendarTitle(hash)
            changeShouldDisplay(success)
            setCalendarTitle(data)
            setCalendarTitleLoading(false)
        }

        getTitle(props.hash, props.changeShouldDisplay)
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