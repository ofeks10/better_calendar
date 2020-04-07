const axios = require('axios')

async function getCalendarTitle(hash) {
    try {
        const { data } = await axios.get('/calendar?calendar_hash=' + hash)
        const { success, error_msg, title } = data
        if (!success) {
            return {
                success: success,
                data: error_msg
            }
        }
        return {
            success: success,
            data: title
        }
    } catch (error) {
        console.log(error)
    }
}

export default getCalendarTitle