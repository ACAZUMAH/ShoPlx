import { Schema, model,Types } from 'mongoose'

const categorySchema = new Schema({
    name:{
        type: String,
        required: [true, 'category name required'],
        trim: true
    },
    parent_catalog:{
        type: Types.ObjectId,
        ref: 'catalog'
    },
    brands:[{
        type: Types.ObjectId,
        ref: 'brands'
    }],
    types: [{
        type: Types.ObjectId,
        ref: 'type'
    }],
    products_Ids:[{
        type: Types.ObjectId,
        ref: 'products'
    }]
})

const category = model('category', categorySchema)
export default category
