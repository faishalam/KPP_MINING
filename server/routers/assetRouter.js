const express = require('express')
const AssetController = require('../controllers/assetController')
const authentication = require('../middleware/authentication')
const assetRouter = express.Router()


assetRouter.use(authentication)
assetRouter.get("/asset", AssetController.getAsset)
assetRouter.post("/asset", AssetController.addAsset)
assetRouter.get("/asset/by-user", AssetController.getAssetByUser)
assetRouter.get("/asset/:id", AssetController.getAssetById)
assetRouter.delete("/asset/:id", AssetController.deleteAsset)
assetRouter.put("/asset/:id", AssetController.updateAsset)
assetRouter.patch("/asset/:id", AssetController.updateAssetStatus)
assetRouter.patch("/asset-action/:id", AssetController.updateAction)

module.exports = assetRouter