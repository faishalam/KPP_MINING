const express = require('express')
const UserController = require('../controllers/userController')
const authentication = require('../middleware/authentication')
const userRouter = express.Router()

userRouter.post("/login", UserController.login)
userRouter.get('/user', authentication, UserController.getAllUser)
userRouter.post("/register", authentication, UserController.register)
userRouter.get('/user-me', authentication, UserController.getMyAccount)
userRouter.get('/user/:id', authentication, UserController.getUserDetail)
userRouter.put("/user/:id", authentication, UserController.updateUser)
userRouter.delete('/user/:id', authentication, UserController.deleteUser)


module.exports = userRouter