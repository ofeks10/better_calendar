import React, {useState, useEffect} from 'react'

import getEvents from './server/GetEvents.js'

import './stylesheets/Events.css'

function getInitializedEventObject(event) {
    return { 
        title: event.title,
        startTime: event.start_time,
        endTime: event.end_time
    }
}

function Events(props) {
    const [eventsList, setEventsList] = useState([])
    const { date, hash } = props
    const rowHeightPercent = 7
    const basicStyle = {
        width: '80%',
        height: '0',
        zIndex: 1,
        position: 'absolute',
        right: 'calc(10% - 2px)',
        top: '0',
        backgroundColor: 'white'
    }

    useEffect(() => {
        async function getData(hash, date) {
            const { data } = await getEvents(hash, date)
            setEventsList(data)
        }

        getData(hash, date)
    }, [date, hash])

    const eventObjects = eventsList.map(event => {
        const { title, startTime, endTime } = getInitializedEventObject(event)
        const currentStartEventTime = new Date(startTime)
        const currentEndEventTime = new Date(endTime)
        const currentEventStartOffset = currentStartEventTime.getHours() * 2 + 1
        const topNewOffset = currentEventStartOffset * rowHeightPercent

        const diffHours = Math.floor((currentEndEventTime - currentStartEventTime) / (1000*60*60))
        const diffMinutes = Math.floor((currentEndEventTime - currentStartEventTime) / (1000 * 60))

        const currentEventHeight = diffHours * 2
        const addedHeightWithHalfHour = diffMinutes === 30 ? 1 : 0
        console.log(currentEventHeight)
        console.log(addedHeightWithHalfHour)
        const heightNewValue = (currentEventHeight + addedHeightWithHalfHour) * rowHeightPercent
        
        const newStyle = {
            ...basicStyle,
            top: 'calc(' + topNewOffset + '% + 2px)',
            height: 'calc(' + heightNewValue + '% - 4px)'
        }

        console.log(newStyle)
        
        return <div key={title} style={newStyle}>{title}</div>
    })

    return (
        <div>
            { eventObjects }
        </div>
    )
}

export default Events