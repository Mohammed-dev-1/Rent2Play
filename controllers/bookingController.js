const Booking = require('../modules/booking');


// Create a booking & check availability

const createBooking = (req, res, next) => {

    Booking.find({
        
        $and: [
        { court: req.body.court},
        {
            $or :[
            {$and : [
                {bookingStartTime : { $lte: req.body.bookingStartTime }}, // A < Ds < B
                {bookingEndTime : { $gt: req.body.bookingStartTime }}
            ]},
            {$and : [
                {bookingStartTime : { $lt: req.body.bookingEndTime }}, // A < De < B
                {bookingEndTime : { $gte: req.body.bookingEndTime }}
            ]},
            // Ds < A & B < De
            {$and: [
                {bookingStartTime : {$gte: req.body.bookingStartTime}},
                {bookingEndTime : {$lte: req.body.bookingEndTime}},
            ]}
        ]}
    ]}
      
    ).then(function(bookings){
        if(bookings.length > 0){
        res.json({
                message: "You can't book at this time"
            });
            
        }else{  
            Booking.create(req.body).then(function(booking){
                res.json({
                    message: "The booking was created succesfully"
                });
            });
        }     
    })
    .catch(err => console.log);
}

// Get all bookings
const bookingsList = (req, res, next) => {
    Booking.find({}).then(function(bookings){
        res.send(bookings)
    });
}

// Cancel a booking
const cancelBooking = (req, res, next) => {
    Booking.findByIdAndRemove({_id: req.params.id}).then(function(booking){
        res.json({
           message: "The booking was deleted" 
        });
    })
}

// Change the booking info
const modifyBooking = (req, res, next) => {
    Booking.find({
        
        $and: [
        {court: req.body.court},
        {
            $or :[
            {$and : [
                {bookingStartTime : { $lte: req.body.bookingStartTime }}, // A < Ds < B
                {bookingEndTime : { $gt: req.body.bookingStartTime }}
            ]},
            {$and : [
                {bookingStartTime : { $lt: req.body.bookingEndTime }}, // A < De < B
                {bookingEndTime : { $gte: req.body.bookingEndTime }}
            ]},
            // Ds < A & B < De
            {$and: [
                {bookingStartTime : {$gte: req.body.bookingStartTime}},
                {bookingEndTime : {$lte: req.body.bookingEndTime}},
            ]}
        ]}
    ]}).then(function(bookings){
        if(bookings.length > 0){
            res.json({
                message: "You can't book at this time!"
            })
        }else{
            Booking.update(
                {_id: req.params.id}, 
                {
                 bookingStartTime : req.body.bookingStartTime ,
                 bookingEndTime : req.body.bookingEndTime
                }
                
                )
            .then(function(){
                res.json({
                    message: "The booking was updated successfully"
                })
            })
            
        }
    })
}
    
module.exports = {
    createBooking,
    bookingsList,
    cancelBooking,
    modifyBooking
}