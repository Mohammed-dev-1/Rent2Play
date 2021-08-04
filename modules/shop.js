const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isEmail } = require('validator');


// create equipment schema and model 
const ShopSchema = new Schema({
    name: {
        type: String,
        required: [true, "name is required"]
    },
    socialMediaAccount: {
        type: String,
        required: [true, 'Please provide us with at least 1 account on social media'],
        enum: ['Facebook', 'Instagram', 'Twitter', 'Other']
    },
    accountName: {
        type: String,
    },
    website: {
        type: String
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    phoneNumber:{
        type: Number
    },
    email: {
        type: String,
        validate: [isEmail, 'Please enter a valid email']
    },
    sport: {
        type: String,
        enum: ['Tennis', 'Squach', 'Padel']
    }

});

const Shop = mongoose.model('shop', ShopSchema);
module.exports = Shop;