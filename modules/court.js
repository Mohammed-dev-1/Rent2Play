const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isEmail } = require('validator');


// create Geo Location schema
const GeoSchema = new Schema({
    type: {
        type: String,
        default: "Point"
    },
    coordinates:{
        type: [Number],
        index: "2dsphere"
    }
});


// create court schema and model 
const CourtSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name field is required.']
    },
    courtType: {
        type: String,
        required: [true, 'court type is required'],
        enum: ['Wood', 'Clay', 'Artificial grass', 'Artificial clay', 'Carpet', 'Asphalt', 'Concrete', 'Acrylic', 'Other']
    },
    sport: {
        type: String,
        required: [true, 'sport is required.'],
        enum: ['Tennis', 'Squach', 'Padel']
    },
    email: {
        type: String,
        validate: [isEmail, 'Please enter a valid email']
    },
    address: {
        type: String,
        required: [true, 'The address is required']
    },
    city: {
        type: String,
        required: [true, 'The city is required']
    },
    website: {
        type: String
    },
    phoneNumber: {
        type: Number,
        required: [true, 'The phone number is required']
    },
    type: {
        type: String,
        required: [true, 'The type is required'],
        enum: ['Indoor', 'Outdoor']
    },
    numberOfCourt: {
        type: Number
    },
    price: {
        type: Number,
        required: [true, 'The price is required']
    },
    onlineBooking: {
        type: Boolean
    },
    rentingInventory: {
        type: Boolean
    },
    coaches: {
        type: Number
    },
    startHour: {
        type: Date
    },
    endHour: {
        type: Date
    },

    // Add in Geolocation
    geometry: GeoSchema
}, { timestamps: true });

const Court = mongoose.model('court', CourtSchema);

module.exports = Court;
