import React, {useEffect, useRef} from 'react'

import { 
    Table,
    Col
} from 'react-bootstrap'

function EventViewer(props) {
    const scrollableColumnRef = useRef(null)

    useEffect(() => {
        scrollableColumnRef.current.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [props.date])

    let rows = []
    for (let i = 0; i < 48; i++) {
        rows.push(<tr key={i}><td>0:00</td><td>{i+1}</td></tr>)
    }
    return (
        <Col ref={scrollableColumnRef} lg={9} className="h-100 scrollable-content">
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
        </Col>
    )
}

export default EventViewer