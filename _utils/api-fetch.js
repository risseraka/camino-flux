const fetch = require('node-fetch')

const apiFetch = async (apiUrl, query, variables) => {
  const res = await fetch(apiUrl, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query, variables })
  })

  return res.json()
}

module.exports = apiFetch
