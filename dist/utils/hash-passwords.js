"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPasswrord = void 0;
const bcrypt_1 = require("bcrypt");
const hashPasswrord = async (password) => {
    try {
        const salt = await (0, bcrypt_1.genSalt)(10);
        return await (0, bcrypt_1.hash)(password, salt);
    }
    catch (error) {
        console.log(error);
    }
};
exports.hashPasswrord = hashPasswrord;
const comparePassword = async (password, hashedPassword) => {
    try {
        return await (0, bcrypt_1.compare)(password, hashedPassword);
    }
    catch (error) {
        console.log(error);
    }
};
exports.comparePassword = comparePassword;
