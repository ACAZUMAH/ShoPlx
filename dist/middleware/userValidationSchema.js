"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerationSchema = void 0;
exports.registerationSchema = {
    first_name: {
        notEmpty: {
            errorMessage: 'First name required'
        },
        isString: {
            errorMessage: 'First name must be a string'
        }
    },
    last_name: {
        isString: {
            errorMessage: 'Last name must be a string'
        },
        notEmpty: {
            errorMessage: 'Last name required'
        }
    },
    email: {
        isEmail: true,
        notEmpty: {
            errorMessage: 'Email required'
        }
    },
    phone: {
        isString: true,
        notEmpty: {
            errorMessage: 'Phone number required'
        }
    },
    password: {
        isString: true,
        notEmpty: {
            errorMessage: 'Password required'
        }
    }
};
