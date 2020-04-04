import React, {useState, useEffect} from 'react'

import {
    Container,
    Row,
    Col,
    Table
} from 'react-bootstrap'

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

    useEffect(() => {
        async function getData(hash) {
            const title = await getCalendarTitle(hash)
            setCalendarTitle(title)
            setCalendarTitleLoading(false)
        }
        getData(props.match.params.hash)
    }, [props.match.params.hash])

    let rows = []
    let rows2 = []

    for (let i = 0; i < 48; i++) {
        rows.push(<tr><td onClick={() => {alert(i)}}>{i}</td><td>{i}</td><td>{i}</td></tr>)
    }

    for (let i = 1; i < 36; i+=7) {
        rows2.push(<tr><td>{i}</td><td>{i+1}</td><td>{i+2}</td><td>{i+3}</td><td>{i+4}</td><td>{i+5}</td><td>{i+6}</td></tr>);
    }

    return (
        <Container fluid className="main-content">
            <Row>
                <Col>
                    <h2>{isCalendarTitleLoading ? "Loading..." : calendarTitle}</h2>
                </Col>
            </Row>
            <Row>
                <Col lg={3}>
                    <Table variant='dark' style={{width: '100%'}} bordered>
                        <tbody>
                            {rows2}
                        </tbody>
                    </Table>
                </Col>
                <Col lg={9}>
                    <Table bordered variant='dark'>
                        <thead>
                            <tr>
                                <th>
                                    04.04.2020
                                </th>
                                <th>
                                    05.04.2020
                                </th>
                                <th>
                                    06.04.2020
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default CalendarContent