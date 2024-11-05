"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Purpose: Validation for accessory routes.
const validateAccessory = {
    category_id: {
        notEmpty: true,
        isString: true,
        errorMessage: 'category id required'
    },
    location: {
        notEmpty: true,
        isString: true,
        errorMessage: 'location required'
    },
    title: {
        notEmpty: true,
        isString: true,
        errorMessage: 'title required'
    },
    brand_id: {
        notEmpty: true,
        isString: true,
        errorMessage: 'brand id required'
    },
    model: {
        notEmpty: true,
        isString: true,
        errorMessage: 'model required'
    },
    type_id: {
        notEmpty: true,
        isString: true,
        errorMessage: 'type id required'
    },
    condition: {
        notEmpty: true,
        isString: true,
        errorMessage: 'condition required'
    },
    price: {
        notEmpty: true,
        isString: true,
        errorMessage: 'price required'
    }
};
exports.default = validateAccessory;
