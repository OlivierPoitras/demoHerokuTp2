"use strict";

const FamilleTemps = require('../models/familletemps');

exports.getFamilles = (req, res, next) => {
    res.setHeader('content-type', 'application/json');
    var activeParam = req.query.active;
    if (activeParam) {
        if (activeParam > 0) {
            FamilleTemps.find({chatons: {$not: {$size: 0} } })
            .then(famillestemps => {
            res.status(200).json({
                message: 'Familles actives récupérées avec succès.',
                famillesTemp: famillestemps
            });
            })
            .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
            });
        }
        else {
            FamilleTemps.find({ chatons: { $size:  0 } })
            .then(famillestemps => {
            res.status(200).json({
                message: 'Familles non-actives récupérées avec succès.',
                famillesTemp: famillestemps
            });
            })
            .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
            });
        }
    }
    else
        FamilleTemps.find()
        .then(famillestemps => {
        res.status(200).json({
            message: 'Familles récupérées avec succès.',
            famillesTemp: famillestemps
        });
        })
        .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        });
};

exports.createFamille = (req, res, next) => {
    res.setHeader('content-type', 'application/json');
    req.headers['content-type'] = 'application/json';
    const famille = new FamilleTemps({
        adresse: req.body.adresse,
        chatons: req.body.chatons
      });
      famille.save()
        .then( () => {
          res.status(201).json({
            message: 'Famille créée avec succès.',
            familleTemp: famille
          });
        })
        .catch(err => {
          console.log('err', err);
        });
};

exports.getFamille = (req, res, next) => {
    res.setHeader('content-type', 'application/json');
    FamilleTemps.findById(req.params.id)
        .then(famille => {
        if (famille) {
            res.status(200).json({
            message: 'Famille récupérée avec succès.',
            familleTemp: famille
            });
        }
        else {
            res.status(404).json({
            message: "Cette famille n'existe pas"
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

exports.updateFamille = (req, res, next) => {
    res.setHeader('content-type', 'application/json');
    req.headers['content-type'] = 'application/json';
    FamilleTemps.findById(req.params.id)
    .then(famille => {
      famille.adresse = req.body.adresse;
      famille.chatons = req.body.chatons;
      return famille.save();
    })
    .then(result => {
      res.status(200).json({
        message: "La famille a été modifiée.",
        familleTemp: result
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteFamille = (req, res, next) => {
    FamilleTemps.findByIdAndRemove(req.params.id)
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

exports.accueillirChaton = (req, res, next) => {
    res.setHeader('content-type', 'application/json');
    req.headers['content-type'] = 'application/json';
    const chatonId = req.body.chatonId;
    const familleid = req.params.id;
    if (!chatonId) {
        res.status(404).json({ message: 
            "Aucun chaton n'a été fourni." });
    }
    FamilleTemps.findById(familleid).then(famille => {
        famille.chatons.push(req.body);
        return famille.save();
    })
    .then(result => {
        res.status(200).json({
            message: "Le chaton a été accueilli.",
            familleTemp: result
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};
