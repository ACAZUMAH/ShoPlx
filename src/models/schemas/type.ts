import { Schema, model, Types } from "mongoose";

const typeSchema = new Schema({
    name: {
        type: String,
        required: [true, 'type name required']
    },
    parent_category: {
        type: Types.ObjectId,
    },
    products_Ids: [{
        type: Types.ObjectId,
        ref: 'products'
    }]
})

const type = model('type', typeSchema)
export default type
