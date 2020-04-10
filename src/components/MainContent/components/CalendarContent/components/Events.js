import React, {useState, useEffect} from 'react'

import getEvents from './server/GetEvents.js'

import './stylesheets/Events.css'

function getInitializedEventObject(event) {
    return {
        title: event.title,
        startTime: event.start_time,
        endTime: event.end_time,
    }
}

function areEventsCoExisting(event1, event2) {
    return (
        (event1 !== event2) &&
        (!(event1.end_time === event2.start_time || event1.start_time === event2.end_time)) &&
        ((event1.start_time > event2.start_time && event1.start_time < event2.end_time) ||
        (event1.end_time > event2.start_time && event1.end_time < event2.end_time) ||
        (event1.start_time === event2.start_time) || (event1.end_time === event2.end_time))
    )
}

function getCoExistingEvents(eventsList, eventToCheck) {
    return eventsList.filter(eventFromList => {
        return (
            areEventsCoExisting(eventFromList, eventToCheck)
        )
    })
}

function calculateEventTopOffset(startTime, endTime, rowHeight) {
    const currentEventStartOffset = startTime.getHours() * 2 + 1
    const addedTopWithHalfHour = startTime.getMinutes() === 30 ? 1 : 0
    return (currentEventStartOffset + addedTopWithHalfHour) * rowHeight
}

function calculateEventHeight(startTime, endTime, rowHeight) {
    const diffHours = Math.floor((endTime - startTime) / (1000 * 60 * 60))
    const diffMinutes = Math.floor((endTime - startTime) / (1000 * 60))
    const currentEventHeight = diffHours * 2
    const addedHeightWithHalfHour = diffMinutes === 30 ? 1 : 0
    return (currentEventHeight + addedHeightWithHalfHour) * rowHeight
}

function getMaxCoExistingToEvent(coExistingToEvent, event, fullEventsList) {
    if (coExistingToEvent.length >= 2) {
        return Math.max(...coExistingToEvent.map(evt => {
            const coExistingToCurrent = getCoExistingEvents(fullEventsList, evt).filter(evnt => evnt !== event)
            return coExistingToCurrent.length
        })) + 1
    } else {
        return coExistingToEvent.length
    }
}

function getCoExistingEventsBeforeThatMoved(coExistingToEvent, event, fullEventsList) {
    if (coExistingToEvent.length > 0) {
        const eventsCoExistingAndBefore = coExistingToEvent.filter(evt => {
            return isEventBeforeEvent(event, evt)
        })

        const eventsCoExistingAndBeforeThatMoved = eventsCoExistingAndBefore.filter(evt => {
            const evtCoExisting = getCoExistingEvents(fullEventsList, evt)
            const evtCoExistingAndBefore = evtCoExisting.filter(evnt => {
                return isEventBeforeEvent(evt, evnt)
            })
            return evtCoExistingAndBefore.length > 0
        })

        console.log(event.title)
        console.log(eventsCoExistingAndBefore.length)
        console.log(eventsCoExistingAndBeforeThatMoved.length)

        return eventsCoExistingAndBefore.length - eventsCoExistingAndBeforeThatMoved.length
    } else {
        return 0
    }
}

function isEventBeforeEvent(event1 , event2) {
    return event1.start_time >= event2.start_time
}

function Events(props) {
    const [eventsList, setEventsList] = useState([])
    const { date, hash } = props
    const rowHeightPercent = 10
    const maxWidth = 80
    const leftBasicOffset = 10

    const basicStyle = {
        backgroundColor: 'white',
        zIndex: 1,
        position: 'absolute',
    }

    useEffect(() => {
        async function getData(hash, date) {
            const { data } = await getEvents(hash, date)
            setEventsList(data)
        }

        getData(hash, date)
    }, [date, hash])

    const eventOjbects = eventsList.map(event =>{
        const {title, startTime, endTime} = getInitializedEventObject(event)
        const coExistingEvents = getCoExistingEvents(eventsList, event)
        
        const eventStartTime = new Date(startTime)
        const eventEndTime = new Date(endTime)

        const topNewOffset = calculateEventTopOffset(eventStartTime, eventEndTime, rowHeightPercent)
        const heightNewValue = calculateEventHeight(eventStartTime, eventEndTime, rowHeightPercent)
        
        const maxCoExistingToCoExisting = getMaxCoExistingToEvent(coExistingEvents, event, eventsList)
        const widthNewValue = maxWidth / (maxCoExistingToCoExisting + 1)

        const coExistingBeforeThatMoved = getCoExistingEventsBeforeThatMoved(coExistingEvents, event, eventsList)
        const leftNewOffset = leftBasicOffset + (widthNewValue * coExistingBeforeThatMoved)

        const randomColorCode = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')'

        const finalStyle = {
            ...basicStyle,
            backgroundColor: randomColorCode,
            top: topNewOffset + '%',
            height: heightNewValue + '%',
            width: widthNewValue + '%',
            left: leftNewOffset + '%',
        }

        return (
            <div style={finalStyle}>
                {title}
            </div>
        )
    })

    return (
        <div>
            {eventOjbects}
        </div>
    )
}

export default Events