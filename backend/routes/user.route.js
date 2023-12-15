const express = require("express")
const userRouter = express.Router()
const userController = require("../controllers/user.controller")

userRouter.post("/login", userController.login)
userRouter.post("/register", userController.register)
userRouter.post("/logout/:token", userController.logout)

module.exports = { userRouter }