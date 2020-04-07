function getInitializedCalendarRowObject(index) {
    return {
        index: index * 1337,
        title: '',
        description: '',
        hours: Math.floor(index / 2),
        minutes: index % 2 === 0 ? '00' : '30',
    }
}

export default getInitializedCalendarRowObject