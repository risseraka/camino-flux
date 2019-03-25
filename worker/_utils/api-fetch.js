const fetch = require('node-fetch')

const apiFetch = async (apiUrl, query, variables) => {
  const res = await fetch(apiUrl, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: variables
      ? JSON.stringify({ query, variables })
      : JSON.stringify({ query })
  })

  return res.json()
}

module.exports = apiFetch
