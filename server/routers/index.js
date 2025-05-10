const express = require('express')
const userRouter = require('./userRouter')
const assetRouter = require('./assetRouter')
const progressRouter = require('./progressRouter')

const router = express.Router()

router.use("/", userRouter)
router.use("/", assetRouter)
router.use("/", progressRouter)




module.exports = router