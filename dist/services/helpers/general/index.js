"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterAndPost = void 0;
const category_1 = require("../products/category");
const mobile_1 = require("../products/mobile");
const accessory_1 = require("../products/accessory");
const headphones_1 = require("../products/headphones");
const filterAndPost = async (_req, _res) => {
    const { category_id } = _req.body;
    const category = await (0, category_1.getCategoryById)(category_id);
    if (category.name === 'mobiles phones') {
        if (await (0, mobile_1.postMobile)(_req))
            return _res.status(200).json({ success: true });
    }
    else if (category.name === 'accessories') {
        if (await (0, accessory_1.postAccessory)(_req))
            return _res.status(200).json({ success: true });
    }
    else if (category.name === 'tablets') {
    }
    else if (category.name === 'smart watches') {
    }
    else if (category.name === 'computers & laptops') {
    }
    else if (category.name === 'Printers & Scanners') {
    }
    else if (category.name === 'Audio & Music Equipments') {
    }
    else if (category.name === 'Headphones') {
        if (await (0, headphones_1.postHeadphone)(_req))
            return _res.status(200).json({ success: true });
    }
};
exports.filterAndPost = filterAndPost;
