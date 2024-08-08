"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.confirmUser = exports.registerUser = void 0;
const express_validator_1 = require("express-validator");
const user_1 = __importDefault(require("../models/schemas/user"));
const custom_errors_1 = require("../customErrors/custom-errors");
const hash_passwords_1 = require("../utils/hash-passwords");
const gen_tokens_1 = require("../auth-services/gen-tokens");
const send_verication_code_1 = __importDefault(require("../auth-services/send-verication-code"));
const registerUser = async (req, res, next) => {
    const { first_name, last_name, email, phone, password } = req.body;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        next((0, custom_errors_1.callCustomError)(errors.array()[0].msg, 400));
    }
    else {
        const userExists = await user_1.default.findOne({ email });
        if (userExists) {
            next((0, custom_errors_1.callCustomError)('User already exists', 400));
        }
        const hashedPassword = await (0, hash_passwords_1.hashPasswrord)(password);
        const newUser = new user_1.default({
            first_name,
            last_name,
            email,
            phone,
            password: hashedPassword
        });
        const savedUser = await newUser.save();
        if (!savedUser) {
            next(new Error('Something went wrong!'));
        }
        const user_id = savedUser._id;
        const email_token = (0, gen_tokens_1.genAccesToken)(user_id);
        (0, send_verication_code_1.default)(email, email_token);
        // const token = genRefreshToken(_id)
        // res.status(201).json({ success: true, token})
    }
};
exports.registerUser = registerUser;
const confirmUser = async (req, res, next) => {
    const _id = req.user.user_id;
    const updateUser = await user_1.default.findByIdAndUpdate({ _id: _id }, { isAuthenticated: true });
    if (!updateUser) {
        next(new Error('Something went wrong!'));
    }
    const refresh = (0, gen_tokens_1.genRefreshToken)(_id);
    res.status(200).json({ token: refresh });
    //res.header(refresh).redirect('http://localhost:3500/api/v1/ShopX/products/static')
};
exports.confirmUser = confirmUser;
const getUser = async (req, res, next) => {
    const _id = req.user.user_id;
    const User = await user_1.default.findById(_id).select('-password');
    if (!User) {
        next((0, custom_errors_1.callCustomError)('User not found', 404));
    }
    res.status(200).json({ success: true, data: User });
};
exports.getUser = getUser;
