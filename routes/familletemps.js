const express = require('express');

const familletempsController = require('../controllers/familletempsController');

const router = express.Router();

router.get('/famillesTemp/:id', familletempsController.getFamille);

router.get('/famillesTemp/:active?', familletempsController.getFamilles);

router.post('/familleTemp', familletempsController.createFamille);

router.put('/famillesTemp/:id', familletempsController.updateFamille);

router.delete('/famillesTemp/:id', familletempsController.deleteFamille);

router.put('/famillesTemp/:id/accueillir', familletempsController.accueillirChaton);

module.exports = router;
