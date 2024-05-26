const axios = require('axios')
const { X_API_KEY, REQUEST_URL } = process.env

const handler = async (event, context) => {
  
  const rootpath = `${REQUEST_URL}/routine`
  const params = JSON.parse(event.body)
  const url = `${rootpath}?memberId=${params.memberId}&planDate=${params.planDate}`
  const header = {
    headers: {
      'X-Api-Key': X_API_KEY
    }
  }

  try {
    const res = await axios.get( url, header )
    return {
      statusCode: 200,
      body: JSON.stringify({result: true, message: null, data: res.data.data})
    }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 200,
      body: JSON.stringify({result: false, message: error.response.data.message, data: null})
    }
  }
}

module.exports = { handler }