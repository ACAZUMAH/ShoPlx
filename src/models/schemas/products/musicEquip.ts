import { Schema, model } from 'mongoose';
import category from '../category';
import brand from '../brand';

const musicEquipmentSchema = new Schema({
    category_id: {
        type: String,
        required: [true, 'category name required']
    },
    location:{
        type: String,
        required: [true, 'location required']
    },
    pictures_ref: [{
        type: String
    }],
    title: {
        type: String,
        required: [true, 'title required']
    },
    brand_id: {
        type: String,
        required: [true, 'brand name required']
    },
    type_id: {
        type: String,
        required: [true, 'type required']
    },
    condition:{
        type: String,
        required: [true, 'condition required']
    },
    exchange: {
        types: Boolean
    },
    description: {
        type: String,
        required: [true, 'description required']
    },
    price:{
        type: String,
        required: [true, 'price required']
    },
    phone:{
        type: String
    },
    created_At: {
        type: Date,
        default: Date.now()
    }
})

const musicEquipment = model('audio and music products', musicEquipmentSchema)
export default musicEquipment