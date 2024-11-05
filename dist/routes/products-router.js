"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gen_tokens_1 = require("../services/jwtservices/gen-tokens");
const express_validator_1 = require("express-validator");
const products_control_1 = require("../controllers/products-control");
const product_validation_1 = __importDefault(require("../middleware/validators/product-validation"));
const validate_accessory_1 = __importDefault(require("../middleware/validators/validate-accessory"));
const router = (0, express_1.Router)();
router.route('/catelog').get(products_control_1.getcatelogs);
router.route('/category').get(products_control_1.getCategories);
router.route('/brands').get(products_control_1.getBrands);
router.route('/types').get(products_control_1.getTypes);
router.route('/category-products').get(products_control_1.getProductsOfcategory);
router.route('/catalog-products').get(products_control_1.getProductsOfCatalog);
router.route('/post-ad-mobile')
    .post((0, express_validator_1.checkSchema)(product_validation_1.default), gen_tokens_1.verifyToken, products_control_1.postProducts);
router.route('post-ad-tablets').post(gen_tokens_1.verifyToken);
router.route('/post-ad-accessories')
    .post((0, express_validator_1.checkSchema)(validate_accessory_1.default), gen_tokens_1.verifyToken);
router.route('/post-ad-smart-watch').post(gen_tokens_1.verifyToken);
router.route('/post-ad-laptops').post(gen_tokens_1.verifyToken);
router.route('/post-ad-headphones').post(gen_tokens_1.verifyToken);
router.route('/post-ad-music-audio').post(gen_tokens_1.verifyToken);
router.route('/post-ad-printers-scanners').post(gen_tokens_1.verifyToken);
// router.route('/products').get(getAllProducts)
// router.route('/products/static').get(getAllProductsStatic)
// router.route('/products/search').get(searchProducts)
exports.default = router;
