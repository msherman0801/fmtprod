const router = require('express').Router();
const Establishment = require('../models/establishment.model');
const AwaitingValidation = require('../models/awaitingValidation.model');
const DateTime = require('../models/dateTime.model');
const Location = require('../models/location.model');

router.route('/').get((req,res) => {
    Establishment.find()
        .then(establishments => res.json(establishments))
});

router.route('/:id').get((req,res) => {
    Establishment.findById(req.params.id)
        .then(obj => res.json(obj))
})

router.route('/test').post((req,res) => {
    console.log(req.body.id)
    DateTime.findById(req.body.id)
        .then(obj => res.json(obj))
        .catch(err => res.json(err))
})

router.route('/add').post((req,res) => {
    const bod = req.body
    const awaitingValidationId = bod._id
    delete bod._id
    const newEstablishment = new Establishment(bod)
    const dateTimes = req.body.dateTime
    const loc = new Location(bod.location);

    newEstablishment.save()
        .then(val => {
            // Date Save
            for (let i in dateTimes) {
                let dtJsonObj = dateTimes[i]
                let dtModelObj = new DateTime(dateTimes[i])
                DateTime.find(dtJsonObj)
                    .then(arr => {
                        if (arr.length > 0) {
                            arr[0].establishments.push(val._id)
                            arr[0].save()
                                .then(obj => console.log("Successfully saved historic object: ", obj))
                                .catch(err => console.log("Error saving historic object: ", err))
                        } else {
                            dtModelObj.save()
                                .then(obj => console.log("Successfully saved new object: ", obj))
                                .catch(err => console.log("Error saving new object: ", err))
                        }
                })
                .catch(err => console.log("Error finding DateTime: ", err))
            }

            // Location Save
            Location.find({ name: bod.location.name, county: bod.location.county, value: bod.location.value })
                .then(arr => {
                    if (arr.length > 0) {
                        arr[0].establishments.push(val._id)
                        arr[0].save()
                            .then(obj => console.log("Successfully saved historic object: ", obj))
                            .catch(err => console.log("Error saving historic object: ", err))
                    } else {
                        loc.save()
                            .then(obj => console.log("Successfully saved new object: ", obj))
                            .catch(err => console.log("Error saving new object: ", err))
                    }
                })
                .catch(err => {
                    console.log(err)
                });
            
            AwaitingValidation.findById(awaitingValidationId).remove().exec()
                // .then(arr => {
                //     if (arr.length > 0) {
                //         arr[0].remove();
                //     } else {
                //         console.log("Old awaitingValidation object doesn't exist. establishments.js/Line 77")
                //     }
                // })
                // .catch(err => console.log("Error removing object: ", err))

            return res.json(val)

            })
            .catch(err => res.json(err));
})

router.route('/filter/location').post((req,res) => {
    let body = req.body
    Location.find({ name: body.name, administrative: body.administrative })
        .then(arr => {
            if (arr.length > 0) {
                Establishment.find({"_id":{"$in": arr[0].establishments}})
                    .then(est => res.send(est))
                    .catch(err => console.log(err))
            } else {
                res.send(arr)
            }
        })
        .catch(err => console.log(err))
})

router.route('/filter/datetime').post((req,res) => {
    let body = req.body
    DateTime.find({day: body.day, openingTime: {time: body.openingTime.time, zone: body.openingTime.zone}, closingTime: {time: body.closingTime.time, zone: body.closingTime.zone}})
        .then(arr => {
            Establishment.find({"_id":{"$in": arr[0].establishments}})
                .then(arr => res.send(arr))
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
})

router.route('/filter/cuisine').post((req,res) => {
    let text = req.body.text
    Establishment.find({ type: text })
        .then(arr => res.send(arr))
        .catch(err => console.log(err))
})

module.exports = router;