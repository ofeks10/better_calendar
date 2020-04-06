import React, { useState, useEffect } from 'react'

import { 
    Row,
    Col
} from 'react-bootstrap'

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

function CalendarTitle(props) {
    const [calendarTitle, setCalendarTitle] = useState("")
    const [isCalendarTitleLoading, setCalendarTitleLoading] = useState(true)

    useEffect(() => {
        async function getData(hash) {
            const title = await getCalendarTitle(hash)
            setCalendarTitle(title)
            setCalendarTitleLoading(false)
        }
        getData(props.hash)
    }, [props.hash])

    return (
        <Row className="title-row">
            <Col>
                <h2>{isCalendarTitleLoading ? "Loading..." : calendarTitle}</h2>
            </Col>
        </Row>
    )
}

export default CalendarTitle