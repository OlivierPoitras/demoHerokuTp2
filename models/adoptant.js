const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adoptantSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  nom: {
    type: String,
    required: true
  },
  telephone: {
    type: Number,
    required: true
  },
  historiqueAdoption: [
    {
      chatonId: {
          type: Schema.Types.ObjectId,
          ref: 'Chaton'
        },
      dateAdoption: { type: Date, required: true }
    }
  ]
});

module.exports = mongoose.model('Adoptant', adoptantSchema);
