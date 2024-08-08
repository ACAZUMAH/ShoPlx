"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const custom_errors_1 = require("../customErrors/custom-errors");
const errorHandler = async (err, req, res, next) => {
    if (err instanceof custom_errors_1.customError) {
        return res.status(err.statusCode).json({ msg: err.message });
    }
    //console.log(err)
    return res.status(500).json({ msg: 'Something went wrong, please try again' });
};
exports.default = errorHandler;
