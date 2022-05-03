const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const familleTempsSchema = new Schema({
    adresse: {
        type: String,
        required: true
      },
    chatons: [
        {
          chatonId: {
              type: Schema.Types.ObjectId,
              ref: 'Chaton'
            }
        }
      ]
});

module.exports = mongoose.model('FamilleTemps', familleTempsSchema);