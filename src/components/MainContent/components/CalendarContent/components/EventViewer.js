import React, {useEffect, useRef, useState} from 'react'

import { 
    Table,
    Col
} from 'react-bootstrap'
import find from 'lodash/find'

import getEvents from './server/GetEvents.js'

function CalendarRow(props) {
    const {title, description, hours, minutes} = props
    return (
        <tr>
            <td>{hours}:{minutes}</td>
            <td>{title} - {description}</td>
        </tr>
    )
}

function getInitializedCalendarRowObject(index) {
    return {
        index: index * 1337,
        title: '',
        description: '',
        hours: Math.floor(index / 2),
        minutes: index % 2 === 0 ? '00' : '30',
    }
}

function EventViewer(props) {
    const scrollableColumnRef = useRef(null)
    const [eventsList, setEventsList] = useState([])
    const {date, hash} = props

    useEffect(() => {
        scrollableColumnRef.current.scrollTo({
            top: 0,
            behavior: 'smooth'
        })

        async function getData(hash, date) {
            const {data} = await getEvents(hash, date)
            setEventsList(data)
        }

        getData(hash, date)
    }, [date, hash])
    
    const initialArray = new Array(48)
    const calendarRowsArray = initialArray.map((index, row) => {
        const initalizedRowObject = getInitializedCalendarRowObject(index)
        const {hours, minutes} = initalizedRowObject
        const currentRowDate = new Date(date.getTime()).setHours(hours).setMinutes(Number(minutes))
        const currentRowStartTime = currentRowDate.getTime()
        const foundEvent = find(eventsList, {'start_time': currentRowStartTime})
        const {title, description} = foundEvent
        const rowObject = { ...initalizedRowObject, title, description}
        return <CalendarRow key={index} {...rowObject} />
    })

    return (
        <Col ref={scrollableColumnRef} lg={9} className="h-100 scrollable-content">
            <Table bordered variant='dark'>
                <thead>
                    <tr>
                        <th style={{width: '10%'}}>
                        </th>
                        <th>
                            {date.getDate()}.{date.getMonth() + 1}.{date.getFullYear()}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {calendarRowsArray}
                </tbody>
            </Table>
        </Col>
    )
}

export default EventViewer