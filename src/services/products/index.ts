//import products from '../../models/schemas/product.ts';
import createError from 'http-errors';
import validateProduct from './validate-products.js';

export const createProduct = async (data) => {
    await validateProduct(data)
};