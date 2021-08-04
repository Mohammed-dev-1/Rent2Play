const express = require('express')
const router = express.Router()
const bookingController = require('../controllers/bookingController');

router.post('/bookings', bookingController.createBooking);
router.get('/bookings', bookingController.bookingsList);
router.delete('/bookings/:id', bookingController.cancelBooking);
router.put('/bookings/:id', bookingController.modifyBooking);


module.exports = router;