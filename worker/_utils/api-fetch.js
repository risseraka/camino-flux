const fetch = require('node-fetch')

const apiFetch = async (url, body) => {
  const params = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  }

  const res = await fetch(url, params)

  return res.json()
}

module.exports = apiFetch
