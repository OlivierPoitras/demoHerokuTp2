"use strict";

const Chaton = require('../models/chaton');

exports.getChatons = (req, res, next) => {
  res.setHeader('content-type', 'application/json');
  var sexeParam = req.query.sexe;
  if (sexeParam) {
    Chaton.find({ sexe: sexeParam })
    .then(chatons => {
      res.status(200).json({
        message: 'Chatons correspondants au sexe récupérés avec succès.',
        chatons: chatons
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
  }
  else
  Chaton.find()
    .then(chatons => {
      res.status(200).json({
        message: 'Chatons récupérés avec succès.',
        chatons: chatons
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createChaton = (req, res, next) => {
  req.headers['content-type'] = 'application/json';
  res.setHeader('content-type', 'application/json');
  const chaton = new Chaton({
    nom: req.body.nom,
    sexe: req.body.sexe,
    dateNaissance: req.body.dateNaissance
  });
  chaton.save()
    .then( () => {
      res.status(201).json({
        message: 'Chaton créé avec succès.',
        chaton: chaton
      });
    })
    .catch(err => {
      console.log('err', err);
    });
};

exports.getChaton = (req, res, next) => {
  res.setHeader('content-type', 'application/json');
  const chatonId = req.params.id;
  Chaton.findById(chatonId)
    .then(chaton => {
      if (chaton) {
        res.status(200).json({
          message: 'Chaton récupéré avec succès.',
          chaton: chaton
        });
      }
      else {
        res.status(404).json({
          message: "Ce chaton n'existe pas"
        });
      }
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateChaton = (req, res, next) => {
  req.headers['content-type'] = 'application/json';
  res.setHeader('content-type', 'application/json');
  Chaton.findById(req.params.id)
    .then(chaton => {
      chaton.nom = req.body.nom;
      chaton.sexe = req.body.sexe;
      chaton.dateNaissance = req.body.dateNaissance;
      return chaton.save();
    })
    .then(result => {
      res.status(200).json({
        message: "Le chaton a été modifié.",
        chaton: result
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteChaton = (req, res, next) => {
  Chaton.findByIdAndRemove(req.params.id)
  .then( () => {
    res.status(204).json({
      message: "Le chaton a été supprimé.",
    });
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
};
