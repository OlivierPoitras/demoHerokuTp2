const express = require('express');

const chatonController = require('../controllers/chatonController');

const router = express.Router();

router.get('/chatons/:id', chatonController.getChaton);

router.get('/chatons/:sexe?', chatonController.getChatons);

router.post('/chaton', chatonController.createChaton);

router.put('/chatons/:id', chatonController.updateChaton);

router.delete('/chatons/:id', chatonController.deleteChaton);

module.exports = router;
