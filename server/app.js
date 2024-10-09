if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const env = require('dotenv').config()
const express = require('express');
const router = require('./routers');
const app = express()
// const port = 3000
const cors = require('cors');

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use(router)

module.exports = app
