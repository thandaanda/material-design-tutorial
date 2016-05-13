var express = require('express');
var router = express.Router();
var BankModel = require('../models/bank.model');


router.get('/api/banks', function (req, res) {
    BankModel.find().distinct('bank_name', function (error, docs) {
        if (error) {
            res.status(400);
        } else {
            res.status(200).json({
                banks: docs
            })
        }
    });
});

router.get('/api/city/:bank_name', function (req, res) {
    BankModel.find({
        bank_name: req.params.bank_name
    }).distinct('city', function (error, docs) {
        if (error) {
            res.status(400);
        } else {
            docs.sort();
            res.status(200).json({
                cities: docs
            });
        }
    });
});

router.post('/api/branches', function (req, res) {
    BankModel.find({
        bank_name: req.body.bank_name,
        city: req.body.city
    }).sort({
        'ifsc': 1
    }).exec(function (error, docs) {
        if (error) {
            res.status(400);
        } else {
            res.status(200).json({
                branches: docs
            });
        }
    });
});
module.exports = router;