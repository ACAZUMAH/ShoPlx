import { Schema, Types, model } from "mongoose";
import { accesoriesSchema } from "./products/accessories";
import { headphoneSchema } from "./products/headphones";
import { laptopSchema } from "./products/laptops";
import { mobileSchema } from "./products/mobile";
import { musicEquipmentSchema } from "./products/musicEquip";
import { printerScannerSchema } from "./products/printers";
import { smartWatchSchema } from "./products/smartWatch";
import { tabletSchema } from "./products/tablets";

const productsSchema = new Schema (
    {
        user_id: { ref: "users", type: Types.ObjectId, required: true },
        category_id: { ref: 'category', type: Types.ObjectId, required: true },
        brand_id: { ref: 'brand', type: Types.ObjectId,  required: true },
        type_id: { ref: 'type', type: Types.ObjectId },
        location: { type: String, required: true },
        picture_ref: [{ type: String, required: true }],
        Model: { type: String, required: true },
        color: { type: String },
        condition: { type: String, required: true},
        description: { type: String, reuired: true },
        phone: { type: String },
        price: { type: Number, },
        accesorry: accesoriesSchema,
        headphone: headphoneSchema,
        laptop: laptopSchema,
        mobile: mobileSchema,
        musicEquipment: musicEquipmentSchema,
        printerScanner: printerScannerSchema,
        smartWatch: smartWatchSchema,
        tablet: tabletSchema,
    }, 
    { 
       timestamps: true 
    },
)

const products = model('products', productsSchema)

export default products;