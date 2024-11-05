import { Schema } from "mongoose";

export const mobileSchema = new Schema({
    secondCondition: { type: String },
    exchange: { types: Boolean },
})
