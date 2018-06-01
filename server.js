require('dotenv').config()
const path = require('path')
const express = require('express')
const compression = require('compression')
const serveIndex = require('serve-index')

const app = express()
const port = process.env.NODE_PORT

app.use(compression())

app.use('/', express.static('exports'), serveIndex('exports', { icons: true }))

app.listen(port, () => {
  console.log(`Server: ${port}`)
})
