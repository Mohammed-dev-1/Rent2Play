const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema ({
    court: {
        type: Schema.Types.ObjectId,
        ref : 'court'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref : 'user'
    },
    bookingStartTime: {
        type: Date,
        required: [true , "Please provide a start time for your booking"]
    },
    bookingEndTime: {
        type: Date,
        required: [true , "Please provide an end time for your booking"]
    },
    isActive: {
        type: Boolean,
        default: true
    }
    
}, { timestamps : true });

const Booking = mongoose.model('booking', BookingSchema)

module.exports = Booking;