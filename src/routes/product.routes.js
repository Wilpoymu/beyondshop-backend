import { Router } from "express";
const router = Router();

import * as productsCtrl from "../controllers/products.controller";
import { verifyToken } from "../middlewares";

router.get("/", productsCtrl.getProducts);

router.post("/", verifyToken, productsCtrl.createProduct); // Add verifyToken middleware

router.get("/:productId", productsCtrl.getProductById);

router.put("/:productId", productsCtrl.updateProductById);

router.delete("/:productId", productsCtrl.deleteProductById);

export default router;
