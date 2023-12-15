const express = require("express")
const doubtQueryRouter = express.Router()
const doubtQueryController = require("../controllers/doubtQuery.controller")
const { Authentication } = require("../middlewares/authentication.middleware")

doubtQueryRouter.post("/create", Authentication(["Student"]), doubtQueryController.create)
doubtQueryRouter.get("/logs", Authentication(["Student"]), doubtQueryController.logs)


module.exports = { doubtQueryRouter }