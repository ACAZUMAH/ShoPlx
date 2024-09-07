"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vallidateMobileProduct = void 0;
exports.vallidateMobileProduct = {
    category_id: {
        notEmpty: {
            errorMessage: 'Category name required'
        },
        isString: {
            errorMessage: 'Category name must be a string'
        }
    },
    location: {
        notEmpty: {
            errorMessage: 'Location required'
        },
        isString: {
            errorMessage: 'Location must be a string'
        }
    },
    pictures: {
        notEmpty: {
            errorMessage: 'Pictures required'
        },
        isArray: {
            Options: { min: 1, max: 5 },
            errorMessage: 'Pictures must be at least 1 and at most 5'
        }
    },
    brand_id: {
        notEmpty: {
            errorMessage: 'Brand name required'
        },
        isString: {
            errorMessage: 'Brand name must be a string'
        }
    },
    model: {
        notEmpty: {
            errorMessage: 'Model name required'
        },
        isString: {
            errorMessage: 'Model name must be a string'
        }
    },
    condition: {
        notEmpty: {
            errorMessage: 'Condition required'
        },
        isString: {
            errorMessage: 'Condition must be a string'
        }
    },
    secondCondition: {
        isString: {
            errorMessage: 'Second condition must be a string'
        }
    },
    color: {
        isString: {
            errorMessage: 'Color must be a string'
        }
    },
    price: {
        notEmpty: {
            errorMessage: 'Price required'
        },
        isString: {
            errorMessage: 'Price must be a string'
        }
    }
};
