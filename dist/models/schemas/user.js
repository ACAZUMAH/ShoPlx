"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    full_name: {
        type: String,
        required: [true, 'First name required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email required']
    },
    telephone: {
        type: String,
        required: true
    },
    whatsup: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: [true, 'Password required']
    },
    isAuthenticated: {
        type: Boolean,
        default: false
    },
});
const user = (0, mongoose_1.model)('users', userSchema);
exports.default = user;
