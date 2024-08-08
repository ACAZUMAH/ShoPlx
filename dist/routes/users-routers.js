"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const userValidationSchema_1 = require("../middleware/userValidationSchema");
const users_control_1 = require("../controllers/users-control");
const gen_tokens_1 = require("../auth-services/gen-tokens");
const router = (0, express_1.Router)();
router.route('/signup').post((0, express_validator_1.checkSchema)(userValidationSchema_1.registerationSchema), users_control_1.registerUser);
router.route('/confirm-email/:token').get(gen_tokens_1.verifyEmailToken, users_control_1.confirmUser);
router.route('/get-user').get(gen_tokens_1.verifyToken, users_control_1.getUser);
exports.default = router;