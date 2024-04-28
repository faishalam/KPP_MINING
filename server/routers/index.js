const express = require('express')
const userRouter = require('./userRouter')
const assetRouter = require('./assetRouter')

const router = express.Router()

router.use("/", userRouter)
router.use("/", assetRouter)




module.exports = router