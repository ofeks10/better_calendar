import React, {useEffect, useRef, useState} from 'react'

import { 
    Table,
    Col
} from 'react-bootstrap'

import getEvents from './server/GetEvents.js'
import CalendarTableHeader from './CalendarTableHeader.js'
import CalendarTableHours from './CalendarTableHours.js'

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
    
    

    return (
        <Col ref={scrollableColumnRef} lg={9} className="h-100 scrollable-content">
            <Table bordered variant='dark'>
                <CalendarTableHeader date={date} />
                <CalendarTableHours />
            </Table>
        </Col>
    )
}

export default EventViewer