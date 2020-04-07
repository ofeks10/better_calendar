import React from 'react'

function CalendarRow(props) {
    const { hours, minutes } = props
    return (
        <tr className='h-7'>
            <td className='hours-col h-7'>{hours}:{minutes}</td>
            <td className='h-7'></td>
        </tr>
    )
}

export default CalendarRow