const express = require('express');

const adoptantController = require('../controllers/adoptantController');

const router = express.Router();

router.get('/adoptants/:id', adoptantController.getAdoptant);

router.get('/adoptants', adoptantController.getAdoptants);

router.post('/adoptant', adoptantController.createAdoptant);

router.put('/adoptants/:adoptantId', adoptantController.updateAdoptant);

router.delete('/adoptants/:adoptantId', adoptantController.deleteAdoptant);

router.put('/adoptants/:id/adoption', adoptantController.adoptantReserve);

module.exports = router;
