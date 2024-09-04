import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    full_name: {
        type: String,
        required: [true, 'First name required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email required']
    },
    telephone:{
        type: String,
        required: true
    },
    whatsup: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: [true, 'Password required']
    },
    isAuthenticated: {
        type: Boolean,
        default: false
    },
})

const user = model('users', userSchema)
export default user