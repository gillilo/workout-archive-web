const axios = require('axios')
const { X_API_KEY, REQUEST_URL } = process.env

const handler = async (event, context) => {
  
  const rootpath = `${REQUEST_URL}/members`
  const url = `${rootpath}`
  const params = JSON.parse(event.body)
  const header = {
    headers: {
      'X-Api-Key': X_API_KEY
    }
  }

  try {
    const res = await axios.patch( url, params, header )
    // console.log(res)
    return {
      statusCode: 200,
      body: JSON.stringify({result: true, message: res.data})
    }
  } catch (error) {
    console.log(error.response.status, "Error: ", error.response.data)
    return {
      // statusCode: error.response.status,
      statusCode: 200,
      body: JSON.stringify({result: false, message: error.response.data})
    }
  }
}

module.exports = { handler }