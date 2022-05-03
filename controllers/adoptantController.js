"use strict";

const Adoptant = require('../models/adoptant');
const FamilleTemps = require('../models/familletemps');
const Chaton = require('../models/chaton');

exports.adoptantReserve = (req, res, next) => {
  res.setHeader('content-type', 'application/json');
  req.headers['content-type'] = 'application/json';
  const chatonId = req.body.chatonId;
  const dateAdoption = req.body.dateAdoption;
  if (!dateAdoption || !chatonId) {
    res.status(400).json({ message: 
      "Ce chaton ne peut pas être adopté, puisqu'il manque une date d'adoption ou l'identifiant du chaton." });
  }
  const adoptantId = req.params.id;
  const chaton = Chaton.findById(chatonId);

  FamilleTemps.find({chatons: {$not: {$size: 0} } }).then(familles => {
    familles.forEach(famille => {
      if (famille.chatons.includes(chaton)) {
        famille.chatons.splice(famille.chatons.indexOf(chaton), 1);
        famille.save();
      }
    });
  });

  Adoptant.findById(adoptantId)
  .then(adoptant => {
    adoptant.historiqueAdoption.push(req.body);
    return adoptant.save();
  })
  .then(result => {
    res.status(200).json({
      message: 'Adoption effectuée.', 
      adoptant: result });
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
  
};

exports.getAdoptants = (req, res, next) => {
  res.setHeader('content-type', 'application/json');
  Adoptant.find()
    .then(adoptants => {
      res.status(200).json({
        message: 'Adoptants récupérés avec succès.',
        adoptants: adoptants
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createAdoptant = (req, res, next) => {
  res.setHeader('content-type', 'application/json');
  req.headers['content-type'] = 'application/json';
  const adoptant = new Adoptant({
    email: req.body.email,
    nom: req.body.nom,
    telephone: req.body.telephone,
    historiqueAdoption: req.body.historiqueAdoption
  });
  adoptant.save()
    .then( () => {
      res.status(201).json({
        message: 'Adoptant créé avec succès.',
        adoptant: adoptant
      });
    })
    .catch(err => {
      console.log('err', err);
    });
};

exports.getAdoptant = (req, res, next) => {
  res.setHeader('content-type', 'application/json');
  Adoptant.findById(req.params.id)
    .then(adoptant => {
      if (adoptant) {
        res.status(200).json({
          message: 'Adoptant récupéré avec succès.',
          adoptant: adoptant
        });
      }
      else {
        res.status(404).json({
          message: "Cet adoptant n'existe pas"
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

exports.updateAdoptant = (req, res, next) => {
  res.setHeader('content-type', 'application/json');
  req.headers['content-type'] = 'application/json';
  Adoptant.findById(req.params.adoptantId)
    .then(adoptant => {
      adoptant.nom = req.body.nom;
      adoptant.email = req.body.email;
      adoptant.telephone = req.body.telephone;
      adoptant.historiqueAdoption = req.body.historiqueAdoption;
      return adoptant.save();
    })
    .then(result => {
      res.status(200).json({
        message: "L'adoptant a été modifié.",
        adoptant: result
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteAdoptant = (req, res, next) => {
  Adoptant.findByIdAndRemove(req.params.adoptantId)
  .then( () => {
    res.status(204).json({
      message: "L'adoptant a été supprimé.",
    });
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
};
