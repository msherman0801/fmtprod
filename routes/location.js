const router = require('express').Router();
const Location = require('../models/location.model');


router.route('/').post((req,res) => {
    Location.findById(req.body._id)
        .then(obj => res.json(obj))
        .catch(err => console.log(err));
});

module.exports = router;