import React from 'react'

import { 
    Col
} from 'react-bootstrap'

import ReactCalendar from 'react-calendar'

function CalendarWidget(props) {
    return(
        <Col lg={3} className="h-100">
            {/* Widget */}
            <ReactCalendar
                onChange={props.onDateChange}
                value={props.selectedDate}
            />
        </Col>
    )
}

export default CalendarWidget