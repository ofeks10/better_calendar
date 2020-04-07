import React, {useEffect, useRef} from 'react'

import { 
    Table,
    Col
} from 'react-bootstrap'

import CalendarTableHeader from './CalendarTableHeader.js'
import CalendarTableHours from './CalendarTableHours.js'
import Events from './Events.js'

import './stylesheets/EventViewer.css'

function EventViewer(props) {
    const scrollableColumnRef = useRef(null)
    const { date } = props
    
    useEffect(() => {
        scrollableColumnRef.current.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [date])

    return (
        <Col ref={scrollableColumnRef} lg={9} className="h-100 scrollable-content">
            <Table bordered variant='dark' className='h-100'>
                <CalendarTableHeader date={date} />
                <CalendarTableHours />
            </Table>
            <Events {...props} />
        </Col>
    )
}

export default EventViewer