"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.confirmUser = exports.registerUser = void 0;
const express_validator_1 = require("express-validator");
const http_errors_1 = __importDefault(require("http-errors"));
const gen_tokens_1 = require("../services/auth-services/gen-tokens");
const send_verification_code_1 = __importDefault(require("../services/auth-services/send-verification-code"));
const users_1 = require("../services/helpers/users");
/**
 * controller to register user
 * @param req - request
 * @param res - response
 * @returns - response when user is created and confirmation email is sent
 * @throws - error when user already or validation fails
 */
const registerUser = async (req, res) => {
    const { full_name, email, telephone, whatsup, password } = req.body;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new http_errors_1.default.BadRequest(errors.array()[0].msg);
    }
    await (0, users_1.checkUserExist)(email);
    const user = await (0, users_1.createUser)(full_name, email, telephone, whatsup, password);
    const email_token = (0, gen_tokens_1.genAccesToken)(user);
    (0, send_verification_code_1.default)(email, email_token);
    return res.status(201).json({ success: true, message: 'comfirmation email sent' });
};
exports.registerUser = registerUser;
/**
 * controller for verification and generating refresh token
 * @param req - request
 * @param res - response
 * @returns send refresh token
 * @throws
 */
const confirmUser = async (req, res) => {
    const _id = req.user.user_id;
    await (0, users_1.findOneAndUpdate)(_id);
    const refresh = (0, gen_tokens_1.genRefreshToken)(_id);
    res.status(200).json({ token: refresh });
};
exports.confirmUser = confirmUser;
/**
 * controller for getting user
 * @param req - request
 * @param res - response
 * @returns user
 */
const getUser = async (req, res) => {
    const _id = req.user.user_id;
    const User = await (0, users_1.findUserById)(_id);
    res.status(200).json({ success: true, data: User });
};
exports.getUser = getUser;
