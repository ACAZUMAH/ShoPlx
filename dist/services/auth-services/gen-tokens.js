"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.genRefreshToken = exports.verifyEmailToken = exports.genAccesToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_errors_1 = __importDefault(require("http-errors"));
require('dotenv').config();
const secret = process.env.JWT_SECRET;
/**
 * generating acces token
 * @param id - user id
 * @returns token
 */
const genAccesToken = (id) => {
    const payload = { user_id: id };
    return jsonwebtoken_1.default.sign(payload, secret, { expiresIn: '2mins' });
};
exports.genAccesToken = genAccesToken;
/**
 * verifying acces token
 * @param req - resquest
 * @param res - response
 * @param next - next function
 * @returns void
 */
const verifyEmailToken = (req, res, next) => {
    const token = req.params.token;
    if (token) {
        jsonwebtoken_1.default.verify(token, secret, (err, decoded) => {
            if (err) {
                throw new http_errors_1.default.Forbidden('authentication failed!');
            }
            req.user = decoded;
            next();
        });
    }
};
exports.verifyEmailToken = verifyEmailToken;
/**
 * generating refresh token
 * @param id - user id
 * @returns token
 */
const genRefreshToken = (id) => {
    const payload = { user_id: id };
    return jsonwebtoken_1.default.sign(payload, secret, { expiresIn: '50d' });
};
exports.genRefreshToken = genRefreshToken;
/**
 * verifying acces token
 * @param req - resquest
 * @param res - response
 * @param next - next function
 * @returns void
 */
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        throw new http_errors_1.default.Unauthorized('Unauthorized');
        return;
    }
    const token = authHeader.split(' ')[1];
    jsonwebtoken_1.default.verify(token, secret, (err, decoded) => {
        if (err) {
            throw new http_errors_1.default.Unauthorized('Unauthorized');
        }
        req.user = decoded;
        next();
    });
};
exports.verifyToken = verifyToken;
