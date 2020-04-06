import React from 'react'

import { 
    Table
} from 'react-bootstrap'

function EventViewer(props) {

    let rows = []
    for (let i = 0; i < 48; i++) {
        rows.push(<tr key={i}><td>0:00</td><td>{i+1}</td></tr>)
    }
    return (
        <Table bordered variant='dark'>
            <thead>
                <tr ref={props.ref}>
                    <th style={{width: '10%'}}>
                    </th>
                    <th>
                        {props.date.getDate()}.{props.date.getMonth() + 1}.{props.date.getFullYear()}
                    </th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </Table>
    )
}

export default EventViewer