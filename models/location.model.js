const mongoose = require('mongoose')
const Schema = mongoose.Schema

const locationSchema = new Schema({
    name: { type: String, required: true },
    county: { type: String, required: true },
    city: { type: String, required: false },
    countryCode: { type: String, required: true },
    type: { type: String, required: true },
    latlng: { type: Object, required: true },
    administrative: { type: String, required: true },
    postcode: { type: String, required: true },
    postcodes: [{ type: String, required: true }],
    value: { type: String, required: true },
    query: { type: String, required: true },
    establishments: []
});

locationSchema.index({ name: 1, county: 1, value: 1 }, { unique: true });


module.exports = mongoose.model('Location', locationSchema);