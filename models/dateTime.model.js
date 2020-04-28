const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dateTime = new Schema({
    day: { type: String, required: true },
    openingTime: {
        time: { type: String, required: true },
        zone: { type: String, required: true }
    },
    closingTime: {
        time: { type: String, required: true },
        zone: { type: String, required: true }
    },
    establishments: []
});

dateTime.index({ day: 1, openingTime: 1, closingTime: 1 }, { unique: true });

module.exports = mongoose.model('DateTime', dateTime);