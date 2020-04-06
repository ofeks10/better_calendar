import React, {useEffect} from 'react'

import { 
    Table
} from 'react-bootstrap'

function EventViewer(props) {

    useEffect(() => {
        console.log(window)
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [props.date]);

    let rows = []
    for (let i = 0; i < 48; i++) {
        rows.push(<tr><td>0:00</td><td>{i+1}</td></tr>)
    }
    return (
        <Table bordered variant='dark'>
            <thead>
                <tr>
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