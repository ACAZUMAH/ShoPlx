"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
/**
 * error handler middleware
 * @param err - error
 * @param req - request
 * @param res - response
 * @param next - nextfunction
 * @returns error response
 */
const errorHandler = async (err, req, res, next) => {
    console.log(err);
    if (http_errors_1.default.isHttpError(err)) {
        return res.status(err.statusCode).send({ errors: [{ msg: err.message }] });
    }
    return res.status(500).json({ msg: 'Internal Server Error' });
};
exports.default = errorHandler;
