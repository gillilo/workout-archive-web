const axios = require('axios')
const { X_API_KEY, REQUEST_URL } = process.env

const handler = async (event, context) => {
  const params = JSON.parse(event.body)
  const { name, type, muscle, difficulty, offset } = params
  const rootpath = `${REQUEST_URL}/workout`
  // const rootpath = `https://api.api-ninjas.com/v1/exercises`
  
  const url = `${rootpath}?n=${name}&t=${type}&m=${muscle}&d=${difficulty}&o=${offset}&l=10`
  // const url = `${rootpath}?name=${name}&type=${type}&muscle=${muscle}&difficulty=${difficulty}&offset=${offset}&limit=10`

  try {
    const res = await axios.get(
      url, 
      {
        headers: {
          'X-Api-Key': X_API_KEY
        }
      }
    )
    if (res.data.Error) {
      // reject(res.data.Error)
      return {
        statusCode: 400,
        body: res.data.Error
      }
    }
    // resolve(res)
    return {
      statusCode: 200,
      body: JSON.stringify(res.data.data)
    }
  } catch (error) {
    console.log(error.response.status)
    // reject(error.message)
    return {
      statusCode: error.response.status,
      body: error.message
    }
  }
}

module.exports = { handler }


// request.get({
//   url: 'https://api.api-ninjas.com/v1/exercises?muscle=' + muscle,
//   headers: {
//     'X-Api-Key': X_API_KEY
//   },
// }, function(error, response, body) {
//   if(error) return console.error('Request failed:', error);
//   else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
//   else console.log(body)
// });