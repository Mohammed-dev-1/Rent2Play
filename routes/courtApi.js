const express = require('express')
const router = express.Router()
const courtController = require('../controllers/courtController')

router.get('/courts',courtController.courtsList);
router.post('/courts', courtController.addCourt);
router.put('/courts/:id', courtController.updateCourt);
router.delete('/courts/:id', courtController.deleteCourt);
router.get('/courts/city/:city/sport/:sport/bookingStartTime/:bookingStartTime/bookingEndTime/:bookingEndTime', courtController.getCourt);

module.exports = router;
