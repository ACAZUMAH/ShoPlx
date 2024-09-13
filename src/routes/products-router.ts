import { Router } from "express";
import { verifyToken } from "../services/jwtservices/gen-tokens";
import { checkSchema } from "express-validator";
import { getcatelogs, 
    postProducts, 
    getCategories,
    getBrands,
    getTypes, 
    getProductsOfcategory,
    getProductsOfCatalog} from "../controllers/products-control";
import { vallidateMobileProduct } from "../middleware/product-validation";

const router = Router()

router.route('/catelog').get(getcatelogs)
router.route('/category').get(getCategories)
router.route('/brands').get(getBrands)
router.route('/types').get(getTypes)
router.route('/category-products').get(getProductsOfcategory)
router.route('/catalog-products').get(getProductsOfCatalog)
router.route('/post-ad-mobile')
.post(checkSchema(vallidateMobileProduct),verifyToken, postProducts)
router.route('post-ad-tablets')
router.route('/post-ad-accessories')
router.route('/post-ad-smart-watch')
router.route('/post-ad-laptops')
router.route('/post-ad-headphones')
router.route('/post-ad-music-audio')
router.route('/post-ad-printers-scanners')
// router.route('/products').get(getAllProducts)
// router.route('/products/static').get(getAllProductsStatic)
// router.route('/products/search').get(searchProducts)

export default router
