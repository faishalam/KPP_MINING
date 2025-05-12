const express = require("express");
const AssetController = require("../controllers/assetController");
const authentication = require("../middleware/authentication");
const upload = require("../middleware/upload");
const assetRouter = express.Router();

// const multer = require("multer");
// const upload = multer({ storage: multer.memoryStorage() });

assetRouter.use(authentication);
assetRouter.get("/asset", AssetController.getAsset);
assetRouter.post("/asset", AssetController.addAsset);
assetRouter.get("/asset/by-user", AssetController.getAssetByUser);
assetRouter.get("/asset/:id", AssetController.getAssetById);
assetRouter.patch("/asset", AssetController.updateAssetStatus);
assetRouter.delete("/asset/:id", AssetController.deleteAsset);
assetRouter.put("/asset/:id", AssetController.updateAsset);
assetRouter.patch("/asset-action/:id", AssetController.updateAction);
assetRouter.patch(
  "/asset/:id/foto",
  upload.fields([
    { name: "fotoAsset", maxCount: 1 },
    { name: "fotoTandaTerima", maxCount: 1 },
  ]),
  AssetController.updateAssetFoto
);

module.exports = assetRouter;
