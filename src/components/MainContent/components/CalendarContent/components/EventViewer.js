import React, {useEffect, useRef, useState} from 'react'

import { 
    Table,
    Col
} from 'react-bootstrap'
import find from 'lodash/find'

import getEvents from './server/GetEvents.js'
import getInitializedCalendarRowObject from './logic/GetIntializedCalendarRowObject.js'
import CalendarRow from './CalendarRow.js'
import CalendarTableHeader from './CalendarTableHeader.js'

import './stylesheets/EventViewer.css'

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
    
    const initialArray = [...Array(48)]
    const calendarRowsArray = initialArray.map((row, index) => {
        const initalizedRowObject = getInitializedCalendarRowObject(index)
        // const { hours, minutes } = initalizedRowObject
        // const currentRowDate = new Date(date.getTime())
        // currentRowDate.setHours(hours)
        // currentRowDate.setMinutes(Number(minutes))
        // const currentRowStartTime = currentRowDate.getTime()
        // const foundEvent = find(eventsList, {'start_time': currentRowStartTime})
        // const { title, description } = foundEvent || {}
        const rowObject = { ...initalizedRowObject }
        return <CalendarRow key={index} {...rowObject} />
    })

    return (
        <Col ref={scrollableColumnRef} lg={9} className="h-100 scrollable-content">
            <Table bordered variant='dark'>
                <thead>
                    <CalendarTableHeader date={date} />
                </thead>
                <tbody>
                    {calendarRowsArray}
                </tbody>
            </Table>
        </Col>
    )
}

export default EventViewer