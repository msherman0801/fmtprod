const router = require('express').Router();
const DateTime = require('../models/dateTime.model');


router.route('/').post((req,res) => {
    DateTime.findById(req.body._id)
        .then(obj => res.json(obj))
        .catch(err => console.log(err));
});

module.exports = router;