import { Schema, model,Types } from 'mongoose';

const brandSchema = new Schema({
    name: {
        type: String,
        required: [true, 'brand name required']
    },
    parent_categories: [{
        type: Types.ObjectId,
        ref: 'category'
    }],
    poducts_Id:[{
        type: Types.ObjectId,
        ref: 'products'
    }]
})

const brand = model('brands', brandSchema)
export default brand