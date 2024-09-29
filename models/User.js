import mongoose from "mongoose";

export const UserScheme = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Please provide unique Username"],
        unique: [true, "Username Exits"]
    },
    passoword: {
        type: String,
        required: [true, "Please provide a password"],
        unique: false
    },
    email: {
        type: String,
        required: [true, "Please provide a unique email"],
        unique: true
    },
    firstName: { type: String },
    lastName: { type: String },
    mobile: { type: Number },
    address: { type: String },
    profile: { type: String },
})

export default mongoose.model.Users || mongoose.model('User', UserScheme);