"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_control_1 = require("../controllers/products-control");
const router = (0, express_1.Router)();
router.route('/products').get(products_control_1.getAllProducts);
router.route('/products/static').get(products_control_1.getAllProductsStatic);
router.route('/products/search').get(products_control_1.searchProducts);
exports.default = router;
