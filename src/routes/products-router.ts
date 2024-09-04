import { Router } from "express";
import { verifyToken } from "../services/auth-services/gen-tokens";
import { getAllProducts, 
    getAllProductsStatic, 
    getcatelogs, postProducts, 
    searchProducts, getCategories} from "../controllers/products-control";

const router = Router()

router.route('/catelog').get(getcatelogs)
router.route('/categories').get(getCategories)
router.route('/products').get(getAllProducts)
router.route('/products/static').get(getAllProductsStatic)
router.route('/products/search').get(searchProducts)
router.route('/post-product').post(verifyToken, postProducts)

export default router
