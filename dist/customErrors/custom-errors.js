"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callCustomError = exports.customError = void 0;
class customError extends Error {
    constructor(msg, statusCode) {
        super(msg);
        this.statusCode = statusCode;
        this.statusCode = statusCode;
    }
}
exports.customError = customError;
const callCustomError = (msg, statusCode) => {
    return new customError(msg, statusCode);
};
exports.callCustomError = callCustomError;
