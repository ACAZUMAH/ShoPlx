import { Router } from "express";
import { verifyToken } from "../auth-services/gen-tokens";
import { getAllProducts, getAllProductsStatic, postProducts, searchProducts } from "../controllers/products-control";

const router = Router()

router.route('/products').get(getAllProducts)
router.route('/products/static').get(getAllProductsStatic)
router.route('/products/search').get(searchProducts)
router.route('/post-product').post(verifyToken, postProducts)


export default router
