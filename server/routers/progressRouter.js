const express = require('express')
const authentication = require('../middleware/authentication')
const ProgressController = require('../controllers/progressController')
const progressRouter = express.Router()


progressRouter.use(authentication)
progressRouter.get("/progress", ProgressController.geAllProgress)
progressRouter.post("/progress", ProgressController.addProgress)
progressRouter.patch("/progress", ProgressController.updateProgressCapex)
progressRouter.get("/progress/:id", ProgressController.getProgressById)
progressRouter.put("/progress/:id", ProgressController.updateProgress)
progressRouter.delete("/progress/:id", ProgressController.deleteProgress)


module.exports = progressRouter