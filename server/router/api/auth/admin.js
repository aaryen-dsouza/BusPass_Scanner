const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const auth = require('../../../middlewares/auth');

//importing Admin Model
const Admin = require('../../../model/adminModel');

//route "api/admin/auth"
//Post req
//Admin Login
//Public api

router.post('/', (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            msg: "Fill all the fields"
        })
    }
    Admin.findOne({ email: email })

        .then(admin => {
            if (!admin) {
                return res.status(400).json({
                    msg: "Make sure you've entered the correct email",
                    error: true
                })
            }

            //validating password
            const match = bcrypt.compareSync(password, admin.password);

            if (!match) {
                return res.status(400).json({
                    msg: "Wrong password",
                    error: true
                })
            }

            jwt.sign(
                {
                    id: admin._id
                },
                process.env.SECRET_KEY,
                (error, token) => {
                    if (error) {
                        throw error
                    }

                    return res.json({
                        token: token,
                        msg: "Login Successfull",
                        admin: admin.email
                    })
                }
            )
        })
})


//route "api/admin/auth"
//Get req
//Get student from token
//Private api
router.get('/', auth, (req, res) => {
    Admin.findById(req.user.id)
        .then(admin => {
            return res.json({
                admin: admin.email
            })
        })
})


module.exports = router;