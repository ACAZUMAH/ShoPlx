import { Router } from "express";
import { verifyToken } from "../services/jwtservices/gen-tokens";
import { checkSchema } from "express-validator";
import { getcatelogs, 
    postProducts, 
    getCategories} from "../controllers/products-control";
import { vallidateMobileProduct } from "../middleware/product-validation";

const router = Router()

router.route('/catelog').get(getcatelogs)
router.route('/categories').get(getCategories)
router.route('/post-product')
.post(checkSchema(vallidateMobileProduct),verifyToken, postProducts)

// router.route('/products').get(getAllProducts)
// router.route('/products/static').get(getAllProductsStatic)
// router.route('/products/search').get(searchProducts)

export default router
