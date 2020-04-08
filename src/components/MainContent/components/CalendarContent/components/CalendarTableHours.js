import React from 'react'

import getInitializedCalendarRowObject from './logic/GetIntializedCalendarRowObject.js'
import CalendarRow from './CalendarRow.js'

function CalendarTableHours() {
    const initialArray = [...Array(48)]
    const calendarRowsArray = initialArray.map((row, index) => {
        const initalizedRowObject = getInitializedCalendarRowObject(index)
        const rowObject = { ...initalizedRowObject }
        return <CalendarRow key={index} {...rowObject} />
    })

    return (
        <tbody className='h-100'>
            {calendarRowsArray}
        </tbody>
    )
}

export default CalendarTableHours