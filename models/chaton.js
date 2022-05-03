const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatonSchema = new Schema({
    nom: {
        type: String,
        required: true
      },
    sexe: {
        type: String,
        required: true
      },
    dateNaissance: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Chaton', chatonSchema);