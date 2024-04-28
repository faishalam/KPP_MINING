const express = require('express')
const UserController = require('../controllers/userController')
const authentication = require('../middleware/authentication')
const userRouter = express.Router()

userRouter.post("/register", UserController.register)
userRouter.post("/login", UserController.login)
userRouter.get('/user-me', authentication, UserController.getMyAccount)


module.exports = userRouter