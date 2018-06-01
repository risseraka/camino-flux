require('dotenv').config()
const express = require('express')
const compression = require('compression')
const serveIndex = require('serve-index')

const port = process.env.NODE_PORT
const app = express()

app.use(compression())

app.use(
  '/',
  express.static('public'),
  serveIndex('public', { icons: true, view: 'details' })
)

app.listen(port, () => {
  console.log(`Url: http://localhost:${port}`)
})
