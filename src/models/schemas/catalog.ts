import { Schema,model,Types } from "mongoose"

const catalogSchema = new Schema({
    name:{
        type: String,
        required: [true, 'catalog name required'],
        trim: true
    },
    sub_categories:[{
        type: Types.ObjectId,
        ref: 'category'
    }]
})

const catalog = model('Catalogs', catalogSchema)
export default catalog

