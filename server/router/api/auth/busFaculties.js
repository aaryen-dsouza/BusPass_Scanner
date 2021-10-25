const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const BusFaculty = require('../../../model/busFacultyModel');
const auth = require('../../../middlewares/auth');

//route "api/auth/student"
//Post req
//User Login
//Public api

router.post('/', (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            msg: "Fill all the fields"
        })
    }
    BusFaculty.findOne({ email: email })

        .then(faculty => {
            if (!faculty) {
                return res.status(400).json({
                    msg: "Make sure you've entered the registered email"
                })
            }

            //validating password
            const match = bcrypt.compareSync(password, faculty.password);

            if (!match) {
                return res.status(400).json({
                    msg: "Wrong password"
                })
            }

            jwt.sign(
                {
                    id: faculty._id
                },
                process.env.SECRET_KEY,
                (error, token) => {
                    if (error) {
                        throw error
                    }

                    return res.json({
                        token: token,
                        msg: "Login Successfull",
                        busFaculty: faculty
                    })
                }
            )
        })
})

//route "api/bus_faculty/auth"
//Get req
//Get student from token
//Private api

router.get('/', auth, (req, res) => {
    BusFaculty.findById(req.user.id)
        .then(faculty => {
            return res.json({
                busFaculty: faculty
            })
        })
})

module.exports = router