import mongoose, { mongo, Schema } from "mongoose";


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        // minLength: 5,
        // maxLength: 15,
    },
    password: {
        type: String,
        required: true,
        // minLength: 8,
        // maxLength: 30,
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
    },
})

export const User = mongoose.model('User', userSchema)