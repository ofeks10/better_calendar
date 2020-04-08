import React, {useState, useEffect} from 'react'

import maxBy from 'lodash/maxBy'

import getEvents from './server/GetEvents.js'

import './stylesheets/Events.css'

function getInitializedEventObject(event) {
    return { 
        title: event.title,
        startTime: event.start_time,
        endTime: event.end_time,
        top: 0,
        left: 10,
        width: 0,
        height: 0,
    }
}

function getEventsStartingBeforeEvent(eventsList, event) {
    const { startTime } = getInitializedEventObject(event)
    return eventsList.filter(currentEvent => {
        return (
            (currentEvent.start_time < startTime)
        )
    })
}

function getCoExistingEvents(eventsList, event) {    
    return eventsList.filter(currentEvent => {
        return (
            ((currentEvent.startTime >= event.startTime && currentEvent.endTime <= event.endTime) || 
            (currentEvent.endTime >= event.startTime && currentEvent.endTime <= event.endTime) ||
            ((currentEvent.startTime >= event.startTime && currentEvent.startTime <= event.endTime) && currentEvent.endTime > event.endTime)) &&
            ((currentEvent.endTime != event.startTime) && (currentEvent.startTime != event.end_time))
        )
    })
}

function getEventsDuringEvent(eventsList, event) {
    const eventsDuringThisEvent = getCoExistingEvents(eventsList, event)
    if (!eventsDuringThisEvent || eventsDuringThisEvent.length === 0 || !eventsList.length === 0) { return 1; }
    return maxBy(eventsDuringThisEvent, evt => {
        const newEventsDuringThisEvent = eventsDuringThisEvent.filter(event => event !== evt)
        return getEventsDuringEvent(newEventsDuringThisEvent, evt) + newEventsDuringThisEvent.length
    })
}

function Events(props) {
    const [eventsList, setEventsList] = useState([])
    const { date, hash } = props

    const rowHeightPercent = 10
    const maxWidth = 80
    const leftBasicOffset = 10

    const basicStyle = {
        width: '80%',
        height: '0',
        zIndex: 1,
        position: 'absolute',
        left: 'calc(10% + 2px)',
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

    const initialEventObjects = eventsList.map(event => {
        return getInitializedEventObject(event)
    })

    const newEventObjects = initialEventObjects.map(event => {
        const { startTime, endTime, title } = event
        const currentStartEventTime = new Date(startTime)
        const currentEndEventTime = new Date(endTime)
        
        const currentEventStartOffset = currentStartEventTime.getHours() * 2 + 1
        const addedTopWithHalfHour = currentStartEventTime.getMinutes() === 30 ? 1 : 0
        const topNewOffset = (currentEventStartOffset + addedTopWithHalfHour) * rowHeightPercent

        const diffHours = Math.floor((currentEndEventTime - currentStartEventTime) / (1000 * 60 * 60))
        const diffMinutes = Math.floor((currentEndEventTime - currentStartEventTime) / (1000 * 60))

        const currentEventHeight = diffHours * 2
        const addedHeightWithHalfHour = diffMinutes === 30 ? 1 : 0

        const heightNewValue = (currentEventHeight + addedHeightWithHalfHour) * rowHeightPercent

        event.top = topNewOffset
        event.height = heightNewValue

        return event
    })

    let finalEventObjects = new Array(5)

    newEventObjects.forEach((event, index) => {
        const initialWithoutSelf = initialEventObjects.filter(evt => evt !== event)
        const myCoExistingEvents = getCoExistingEvents(initialWithoutSelf, event)

        if (myCoExistingEvents.length !== 0) { 
            event.width = (maxWidth / (myCoExistingEvents.length))
        } else {
            event.width = maxWidth
        }
        
        const myCoExistingAlreadyInFinal = myCoExistingEvents.filter(evt => finalEventObjects.includes(evt))

        let leftOffset = 0
        if (myCoExistingEvents.length === 0) { 
            leftOffset = 0
        } else {
            console.log('-----------' + index + 1 + '-----------')
            console.log(myCoExistingAlreadyInFinal.length)
            console.log(myCoExistingEvents.length)
            console.log(myCoExistingEvents)
            console.log('-----------' + index + '-----------')
            leftOffset = myCoExistingAlreadyInFinal.length * ((maxWidth) / (myCoExistingEvents.length))
        }
        
        
        event.left = leftOffset + leftBasicOffset
        finalEventObjects[index] = event
    });

    console.log(finalEventObjects)

    const componentsArray = finalEventObjects.map(event => {
        const {title} = event
        const newStyle = {
            ...basicStyle,
            top: event.top + '%',
            left: event.left + '%',
            height: event.height + '%',
            width: event.width + '%',
        }

        return <div key={title} style={newStyle}>{title}</div>
    })



    // const eventObjects = eventsList.map((event, index) => {
    //     const myEventObject = getInitializedEventObject(event)
    //     const {startTime, endTime, title} = myEventObject

    //     const myCoExistingEvents = getCoExistingEvents(eventsList, event)

    //     const currentStartEventTime = new Date(startTime)
    //     const currentEndEventTime = new Date(endTime)

    //     const currentEventStartOffset = currentStartEventTime.getHours() * 2 + 1
    //     const addedTopWithHalfHour = currentStartEventTime.getMinutes() === 30 ? 1 : 0
    //     const topNewOffset = (currentEventStartOffset + addedTopWithHalfHour) * rowHeightPercent

    //     const diffHours = Math.floor((currentEndEventTime - currentStartEventTime) / (1000 * 60 * 60))
    //     const diffMinutes = Math.floor((currentEndEventTime - currentStartEventTime) / (1000 * 60))

    //     const currentEventHeight = diffHours * 2
    //     const addedHeightWithHalfHour = diffMinutes === 30 ? 1 : 0

    //     const heightNewValue = (currentEventHeight + addedHeightWithHalfHour) * rowHeightPercent
    //     const widthNewValue = maxWidth / myCoExistingEvents.length

    //     myEventObject.top = topNewOffset
    //     myEventObject.height = heightNewValue
    //     myEventObject.width = widthNewValue

    //     if (index !== 0) { 
    //         if (myCoExistingEvents.includes(eventObjects[index - 1])) {
    //             if (eventObjects[index - 1].left !== 10 && eventObjects[index - 2].endTime) {

    //             }
    //             myEventObject.left += widthNewValue
    //         }
    //     }



        
        

        
        
        // const newEventsList = eventsList.filter(evt => evt !== event)

        // const widthDivider = getCoExistingEvents(newEventsList, getEventsDuringEvent(newEventsList, event)).length + 1
        // const eventsBefore = getEventsStartingBeforeEvent(newEventsList, event)
        // const eventsCoExistingAndBefore = getCoExistingEvents(newEventsList, event).filter(evt => {
        //     return eventsBefore.includes(evt)
        // })

        // const myCoExistingEvents = getCoExistingEvents(newEventsList, event)
        // console.log(title)
        // const eventsBeforeMeThatMoved = myCoExistingEvents.filter(evt => {
        //     const eventsBeforeForEvent = getEventsStartingBeforeEvent(eventsList, evt)
        //     const eventsCoExistingAndBeforeForEvent = getCoExistingEvents(eventsList, evt).filter(evnt => {
        //         return eventsBeforeForEvent.includes(evnt)
        //     })
        //     console.log('--------')
        //     console.log(evt)
        //     console.log(eventsBeforeForEvent)
        //     console.log(eventsCoExistingAndBeforeForEvent)
        //     console.log('--------')
        //     return (
        //         eventsCoExistingAndBeforeForEvent.length >= 1
        //     )
        // })

        // const myCoExistingWithMoved = eventsBeforeMeThatMoved.filter(evnt => {
        //     return myCoExistingEvents.includes(evnt)
        // })

        // const eventLeftPush = leftBasicOffset + (eventsCoExistingAndBefore.length * (maxWidth / widthDivider)) - (myCoExistingWithMoved.length * (maxWidth / widthDivider))
        
    //     const newStyle = {
    //         ...basicStyle,
    //         top: 'calc(' + topNewOffset + '%)',
    //         height: 'calc(' + heightNewValue + '%)',
    //         width: newWidth + '%',
    //     }

    //     return <div key={title} style={newStyle}>{title}</div>
    // })

    return (
        <div>
            { componentsArray }
        </div>
    )
}

export default Events