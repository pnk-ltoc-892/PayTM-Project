import mongoose, { Schema } from "mongoose";


const accountSchema = new Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    }
})

export const Account = mongoose.model('Account', accountSchema)