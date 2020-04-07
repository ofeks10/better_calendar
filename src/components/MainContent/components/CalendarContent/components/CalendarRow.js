import React from 'react'

function CalendarRow(props) {
    const { hours, minutes } = props
    return (
        <tr>
            <td className='hours-row'>{hours}:{minutes}</td>
            <td></td>
        </tr>
    )
}

export default CalendarRow