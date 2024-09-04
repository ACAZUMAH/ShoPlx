"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPasswrord = void 0;
const bcrypt_1 = require("bcrypt");
const http_errors_1 = __importDefault(require("http-errors"));
/**
 * hashing user password
 * @param password - user password
 * @returns hashed password
 * @throws error when hashing fails
 * @example
 * const hashed = await hashedPassword('password')
 * console.log(hashed)
 */
const hashPasswrord = async (password) => {
    try {
        const salt = await (0, bcrypt_1.genSalt)(10);
        return await (0, bcrypt_1.hash)(password, salt);
    }
    catch (error) {
        throw new http_errors_1.default.InternalServerError('Server error');
    }
};
exports.hashPasswrord = hashPasswrord;
/**
 * compare user password and hashed password
 * @param password - password
 * @param hash - hashed password
 * @returns true if password is correct else false
 * @throws error when comparison fails
 * @example
 * const isMatch = await comparePass('password', 'hashedPassword')
 * console.log(isMatch)
 */
const comparePassword = async (password, hash) => {
    try {
        return await (0, bcrypt_1.compare)(password, hash);
    }
    catch (error) {
        throw new http_errors_1.default.InternalServerError('Server error');
    }
};
exports.comparePassword = comparePassword;
