"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    first_name: {
        type: String,
        required: [true, 'First name required']
    },
    last_name: {
        type: String,
        required: [true, 'Last name required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email required']
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAuthenticated: {
        type: Boolean,
        default: false
    },
});
const user = (0, mongoose_1.model)('users', userSchema);
exports.default = user;
