"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gen_tokens_1 = require("../services/jwtservices/gen-tokens");
const express_validator_1 = require("express-validator");
const products_control_1 = require("../controllers/products-control");
const product_validation_1 = require("../middleware/product-validation");
const router = (0, express_1.Router)();
router.route('/catelog').get(products_control_1.getcatelogs);
router.route('/categories').get(products_control_1.getCategories);
router.route('/post-product')
    .post((0, express_validator_1.checkSchema)(product_validation_1.vallidateMobileProduct), gen_tokens_1.verifyToken, products_control_1.postProducts);
// router.route('/products').get(getAllProducts)
// router.route('/products/static').get(getAllProductsStatic)
// router.route('/products/search').get(searchProducts)
exports.default = router;
