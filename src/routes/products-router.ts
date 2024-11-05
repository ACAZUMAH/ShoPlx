/**
 * @swagger
 * tags: 
 *   - name: Product Management
 *     description: Routes for product management
 */
import { Router } from "express";
import { verifyToken } from "../helpers/index.ts";
import {
  getcatelogs,
  postProducts,
  getCategories,
  getBrands,
  getTypes,
  getProductsOfcategory,
  getProductsOfCatalog,
} from "../controllers/products-control";

const router = Router();

router.route("/catelog").get(getcatelogs);
router.route("/category").get(getCategories);
router.route("/brands").get(getBrands);
router.route("/types").get(getTypes);
router.route("/category-products").get(getProductsOfcategory);
router.route("/catalog-products").get(getProductsOfCatalog);
router.route("/products").post(verifyToken, postProducts);

export default router;
