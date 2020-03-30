import React, {useState, useEffect} from 'react'

const axios = require('axios')

async function getCalendarTitle(hash) {
    try {
        const { data } = await axios.get('/calendar?calendar_hash=' + hash)
        if (!data.success) {
            return data.error_msg
        } else {
            console.log(data.title)
            return data.title
        }
    } catch (error) {
        console.log(error)
    }
}

function CalendarContent(props) {
    const [calendarTitle, setCalendarTitle] = useState("")

    useEffect(() => {
        async function getData(hash) {
            const title = await getCalendarTitle(hash)
            console.log(title)
            setCalendarTitle(title)
        }
        getData(props.match.params.hash)
    }, [props.match.params.hash])

    return (
        <div>
            <h1>{calendarTitle}</h1>
        </div>
    )
}

export default CalendarContent