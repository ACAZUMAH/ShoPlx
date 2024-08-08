"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.genRefreshToken = exports.verifyEmailToken = exports.genAccesToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const custom_errors_1 = require("../customErrors/custom-errors");
require('dotenv').config();
const secret = process.env.JWT_SECRET;
const genAccesToken = (id) => {
    const payload = { user_id: id };
    return jsonwebtoken_1.default.sign(payload, secret, { expiresIn: '2mins' });
};
exports.genAccesToken = genAccesToken;
const verifyEmailToken = (req, res, next) => {
    const token = req.params.token;
    if (token) {
        jsonwebtoken_1.default.verify(token, secret, (err, decoded) => {
            if (err) {
                next((0, custom_errors_1.callCustomError)('authentication failed!', 400));
            }
            req.user = decoded;
            next();
        });
    }
};
exports.verifyEmailToken = verifyEmailToken;
const genRefreshToken = (id) => {
    const payload = { user_id: id };
    return jsonwebtoken_1.default.sign(payload, secret, { expiresIn: '50d' });
};
exports.genRefreshToken = genRefreshToken;
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        next((0, custom_errors_1.callCustomError)('Unauthorized', 401));
        return;
    }
    const token = authHeader.split(' ')[1];
    //console.log(token)
    jsonwebtoken_1.default.verify(token, secret, (err, decoded) => {
        if (err) {
            next((0, custom_errors_1.callCustomError)('Unauthorized', 403));
        }
        req.user = decoded;
        next();
    });
};
exports.verifyToken = verifyToken;
