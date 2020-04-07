import React from 'react'

import './stylesheets/CalendarRow.css'

function CalendarTableHeader(props) {
    const {date} = props

    return (
        <thead className='h-7'>
            <tr className='h-7'>
                <th colSpan="2">
                    {date.getDate()}.{date.getMonth() + 1}.{date.getFullYear()}
                </th>
            </tr>
        </thead>
    )
}

export default CalendarTableHeader

