var express = require('express')
var router = express.Router()

const start = require('./start')
const move = require('./move')

// Handle POST request to '/start'
router.post('/start', start)

// Handle POST request to '/move'
router.post('/move', move)

module.exports = router
