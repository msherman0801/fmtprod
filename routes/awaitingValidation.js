const router = require('express').Router();
const AwaitingValidation = require('../models/awaitingValidation.model');

router.route('/').get((req,res) => {
    AwaitingValidation.find()
        .then(establishments => res.json(establishments))
});

router.route('/:id').get((req,res) => {
    AwaitingValidation.findById(req.params.id)
        .then(obj => res.json(obj))
})

router.route('/add').post((req,res) => {
    const bod = req.body
    const newAwaitingValidation = new AwaitingValidation(bod)
    console.log(newAwaitingValidation)
    newAwaitingValidation.save()
        .then(val => {
            res.json(val)
        })
        .catch(err => res.json(err));

})

module.exports = router;