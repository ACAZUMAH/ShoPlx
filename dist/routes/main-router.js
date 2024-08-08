"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_router_1 = __importDefault(require("./products-router"));
const users_routers_1 = __importDefault(require("./users-routers"));
const router = (0, express_1.Router)();
router.use('/api/v1/shopX', users_routers_1.default);
router.use('/api/v1/shopX', products_router_1.default);
exports.default = router;
