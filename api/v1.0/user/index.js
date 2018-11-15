var express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../../../model/user');
const serverConfig = require('../../../config/serverConfig');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');

router.get('/', (req, res, next) => {
    User.find()
        .select("username password")
        .exec()
        .then(docs => {
            let response = {
                count: docs.length,
                result: docs.map(doc => {
                    return {
                        username: doc.username,
                        password: doc.password,
                        request: {
                            type: 'GET',
                            url: `http://${serverConfig.serverHost}:${serverConfig.serverPort}/users/${doc._id}`
                        }
                    }
                }),
            };
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
})

router.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if (err) {
            res.status(500).json({
                error: err
            })
        } else {
            let user = new User({
                _id: new mongoose.Types.ObjectId(),
                username: req.body.username,
                password: hash
            });
            user.save()
                .then(record => {
                    console.log(record);
                    let response = {
                        success: 'true',
                        user: record,
                        request: {
                            type: 'POST',
                            url: `http://${serverConfig.serverHost}:${serverConfig.serverPort}/users/${record._id}`
                        }
                    };
                    res.status(201).json(response);
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
        }
    });
})

router.post('/login', (req, res, next) => {
    User.find({ username: req.body.username })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(404).json({ message: 'Username is not found!' });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (result) {
                    let token = jwt.sign({
                        _id: user[0]._id,
                        username: user[0].username
                    }, process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        });
                    return res.status(200).json({
                        "Beaer Token": token
                    });
                }
                return res.status(401).json({ message: 'Auth fail' });
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
})

router.delete('/:userId', (req, res, next) => {
    User.remove({ _id: req.params.userId })
        .exec()
        .then(record => {
            let response = {
                success: true,
                message: 'User has been delete ...',
                record: record
            };
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
})
module.exports = router;