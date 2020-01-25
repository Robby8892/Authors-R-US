const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')


// Use bcrypt for create user route
// use sessions in register/ login and implement with res.locals in server.js





module.exports = router