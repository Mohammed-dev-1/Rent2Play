const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isEmail } = require('validator');


const CoachSchema = new Schema ({
    firstName: {
        type: String,
        required: [true, 'first name is required']
    },
    lastName: {
        type: String,
        required: [true, 'last name is required']
    },
    socialMediaAccount: {
        type: String,
        required: [true, 'Please provide us with at least 1 account on social media'],
        enum: ['Facebook', 'Instagram', 'Twitter', 'Other']
    },
    accountName: {
        type: String,
    },
    city: {
        type:String
    },
    age: {
        type: Number
    },
    achievements: {
        type: Array
    },
    qualifications: {
        type: Array
    },
    email: {
        type: String,
        validate: [isEmail, 'Please enter a valid email']
    },
    phoneNumber:{
        type: Number
    }
}, { timestamps: true });

const Coach = mongoose.model('coach', CoachSchema);

module.exports = Coach;
