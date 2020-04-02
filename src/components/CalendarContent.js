import React, {useState, useEffect} from 'react'

import {
    Card, 
    ListGroup,
    Container,
    Row,
    Col
} from 'react-bootstrap'

import './CalendarContent.css'
import '../App.css'

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

    let rows = [];
    for (let i = 1; i <= 48; i++) {
        rows.push(<ListGroup.Item variant='dark'>{i}</ListGroup.Item>)
    }


    return (
        <Container fluid className="main-content">
            <Row>
                <Col>
                    <h2>{isCalendarTitleLoading ? "Loading..." : calendarTitle}</h2>
                </Col>
            </Row>
            <Row styleName='m-0' noGutters>
                <Col styleName='text-left'>Test</Col>
                <Col>
                    <Card bg='dark'>
                        <Card.Header>
                            test
                        </Card.Header>
                        <ListGroup variant='dark'>
                            {rows}
                        </ListGroup>
                    </Card>
                </Col>
                <Col>
                    <Card bg='dark'>
                        <Card.Header>
                            test
                        </Card.Header>
                        <ListGroup variant='dark'>
                            {rows}
                        </ListGroup>
                    </Card>
                </Col>
                <Col>
                    <Card bg='dark'>
                        <Card.Header>
                            test
                        </Card.Header>
                        <ListGroup variant='dark'>
                            {rows}
                        </ListGroup>
                    </Card>
                </Col>
                <Col>
                    <Card bg='dark'>
                        <Card.Header>
                            test
                        </Card.Header>
                        <ListGroup variant='dark'>
                            {rows}
                        </ListGroup>
                    </Card>
                </Col>
                <Col>
                    <Card bg='dark'>
                        <Card.Header>
                            test
                        </Card.Header>
                        <ListGroup variant='dark'>
                            {rows}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default CalendarContent