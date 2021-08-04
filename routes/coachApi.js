const express = require('express')
const router = express.Router()
const coachController = require('../controllers/coachController')

router.post('/coachs', coachController.addCoach);
router.get('/coachs', coachController.getCoach);
router.put('/coachs/:id', coachController.updateCoach);
router.delete('/coachs/:id', coachController.deleteCoach);


module.exports = router;