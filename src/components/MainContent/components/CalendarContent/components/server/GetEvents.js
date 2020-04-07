const axios = require('axios')

async function getEvents(hash, date) {
    try {
        const { data } = await axios.get('/events?calendar_hash=' + hash + '&selected_date=' + date.getTime())
        const { success, error_msg, events } = data
        if (!success) {
            return {
                success: success,
                data: error_msg
            }
        }
        return {
            success: success,
            data: events
        }
    } catch (error) {
        console.log(error)
    }
}

export default getEvents