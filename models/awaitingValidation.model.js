const mongoose = require('mongoose')
const Schema = mongoose.Schema
const DateTime = require('../models/dateTime.model');

const dateTime = new Schema({
    day: { type: String, required: true },
    openingTime: {
        time: { type: String, required: true },
        zone: { type: String, required: true }
    },
    closingTime: {
        time: { type: String, required: true },
        zone: { type: String, required: true }
    }
}, {_id: false});

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
}, {_id: false});

const establishmentSchema = new Schema({
    name: { type: String, required: true },
    establishmentName: { type: String, required: true },
    website: { type: String, required: true },
    telephone: { type: Number, required: true, minlength: 10, maxlength: 10 },
    email: { type: String, required: true },
    type: { type: String, required: true },
    dateTime: [dateTime],
    location: locationSchema
});

module.exports = mongoose.model('AwaitingValidation', establishmentSchema);