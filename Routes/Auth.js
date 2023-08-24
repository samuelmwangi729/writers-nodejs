const express = require('express')
const authRoutes = express.Router()
const {Reset,Login,Register} = require("../controllers/BaseController")
authRoutes.get('/Reset/',Reset)
.get('/Login',Login)
.get('/Register',Register)

module.exports= authRoutes