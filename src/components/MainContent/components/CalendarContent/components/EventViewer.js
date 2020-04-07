import React, {useEffect, useRef, useState} from 'react'

import { 
    Table,
    Col
} from 'react-bootstrap'

import getEvents from './server/GetEvents.js'

function CalendarRow(props) {
    const {index, title, desc, hours, minutes} = props
    return (
        <tr key={index}>
            <td>{hours}:{minutes}</td>
            <td>{title} - {desc}</td>
        </tr>
    )
}

function getInitializedCalendarRowObject(index) {
    return {
        index: index,
        title: '',
        desc: '',
        hours: '0',
        minutes: index === 2 ? '00' : '30',
    }
}

function EventViewer(props) {
    const scrollableColumnRef = useRef(null)
    const [eventsList, setEventsList] = useState([])

    useEffect(() => {
        scrollableColumnRef.current.scrollTo({
            top: 0,
            behavior: 'smooth'
        })

        async function getData(hash, date) {
            const {data} = await getEvents(hash, date)
            setEventsList(data)
        }

        getData(props.hash, props.date)
    }, [props.date, props.hash])
    
    const initialArray = new Array(48)
    const calendarRowsArray = initialArray.map((index, row) => {

    })

    let rows = new Array(48)
    eventsList.forEach(event => {
        const startTime = new Date(event.start_time)
        rows[startTime.getHours() * 2] = (
            
        )
    })

    for (let i = 0; i < rows.length; i++) {
        if (!rows[i]) {
            if (i % 2 === 0) {
                rows[i] = (
                    <tr key={i}>
                        <td>{i}:00</td>
                        <td>No Event</td>
                    </tr>
                )
            } else {
                rows[i] = (
                    <tr key={i}>
                        <td>{i}:30</td>
                        <td>No Event</td>
                    </tr>
                )
            }
        }
    }

    return (
        <Col ref={scrollableColumnRef} lg={9} className="h-100 scrollable-content">
            <Table bordered variant='dark'>
                <thead>
                    <tr ref={props.ref}>
                        <th style={{width: '10%'}}>
                        </th>
                        <th>
                            {props.date.getDate()}.{props.date.getMonth() + 1}.{props.date.getFullYear()}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
        </Col>
    )
}

export default EventViewer