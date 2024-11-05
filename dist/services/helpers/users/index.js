"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOneAndUpdate = exports.findUserById = exports.checkUserExist = exports.createUser = void 0;
const user_1 = __importDefault(require("../../../models/schemas/user"));
const hash_passwords_1 = require("../../utils/hash-passwords");
const http_errors_1 = __importDefault(require("http-errors"));
/**
 * create user and save to database
 * @param full_name - user full name
 * @param email - user email
 * @param telephone - user telephone number
 * @param whatsup - user whatsup number
 * @param password - user password
 * @returns returns user id
 * @throws throws error if user already exists
 */
const createUser = async (full_name, email, telephone, whatsapp_no, password) => {
    const hash = await (0, hash_passwords_1.hashPasswrord)(password);
    const newUser = await user_1.default.create({
        full_name,
        email,
        telephone,
        whatsapp_no,
        password: hash,
    });
    if (!newUser) {
        throw new http_errors_1.default.InternalServerError("unable to create account");
    }
    return newUser;
};
exports.createUser = createUser;
/**
 * check if user exists
 * @param email - user email
 * @throws throws error if user already exists
 */
const checkUserExist = async (email) => {
    if (await user_1.default.findOne({ email })) {
        throw new http_errors_1.default.BadRequest("User already exists");
    }
};
exports.checkUserExist = checkUserExist;
/**
 * find user by id
 * @param _id - user id
 * @returns returns user
 * @throws error when user not found
 */
const findUserById = async (_id) => {
    if (!(await user_1.default.findById(_id))) {
        throw new http_errors_1.default.BadRequest("User not found");
    }
    return await user_1.default.findById(_id);
};
exports.findUserById = findUserById;
/**
 * find one user and update
 * @param _id - user id
 * @param full_name - user full name
 * @param email - user email
 * @param telephone - user telephone number
 * @param whatsup - user whatsup number
 * @returns true
 * @throws error when user is not found
 */
const findOneAndUpdate = async (_id, full_name, email, telephone, whatsup) => {
    if (_id) {
        if (!(await user_1.default.findById(_id))) {
            throw new http_errors_1.default.BadRequest("User not found");
        }
        await user_1.default.findByIdAndUpdate({ _id: _id }, { isAuthenticated: true });
    }
    return true;
};
exports.findOneAndUpdate = findOneAndUpdate;
