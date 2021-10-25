const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//importing Student Model
const Students = require('../../../model/studentModel');
const auth = require('../../../middlewares/auth');


//route "api/student/auth"
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
    Students.findOne({ email: email })

        .then(student => {
            if (!student) {
                return res.status(400).json({
                    msg: "Make sure you've entered the registered email"
                })
            }

            //validating password
            const match = bcrypt.compareSync(password, student.password);

            if (!match) {
                return res.status(400).json({
                    msg: "Wrong password"
                })
            }

            jwt.sign(
                {
                    id: student._id
                },
                process.env.SECRET_KEY,
                (error, token) => {
                    if (error) {
                        throw error
                    }

                    return res.json({
                        token: token,
                        msg: "Login Successfull",
                        student: student
                    })
                }
            )
        })
})

//route "api/student/auth"
//Get req
//Get student from token
//Private api

router.get('/', auth, (req, res) => {
    Students.findById(req.user.id)
        .then(student => {
            return res.json({
                student: student
            })
        })
})

module.exports = router