import React from 'react'

function CalendarTableHeader(props) {
    const {date} = props
    
    return (
        <tr>
            <th colspan="2">
                {date.getDate()}.{date.getMonth() + 1}.{date.getFullYear()}
            </th>
        </tr>
    )
}

export default CalendarTableHeader

