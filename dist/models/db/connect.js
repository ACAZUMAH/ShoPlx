"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const connectDB = (url) => {
    return (0, mongoose_1.connect)(url, {
        autoIndex: true,
    });
};
exports.default = connectDB;
