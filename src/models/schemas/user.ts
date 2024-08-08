import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    first_name: {
        type: String,
        required: [true, 'First name required']
    },
    last_name: {
        type: String,
        required: [true, 'Last name required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email required']
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAuthenticated: {
        type: Boolean,
        default: false
    },
})

const user = model('users', userSchema)
export default user