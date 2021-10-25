const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//importing Admin Model
const Admin = require('../../model/adminModel');

//route 'api/admin/data/'
//GET req
//To get admin info

router.get('/', (req, res) => {
    Admin.find((error, response) => {
        if (error) {
            return res.status(500).json({
                msg: "Data load error, try again later"
            })
        }

        return res.json({
            msg: "Data load success",
            admin: response
        })
    })
})


//route 'api/admin/data/'
//POST req
//To register a new admin

router.post('/', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            msg: "Enter all fields"
        })
    }

    //encrypting password
    const hashedPass = bcrypt.hashSync(password);

    Admin.findOne({ email: email })
        .then(user => {
            if (user) {
                return res.status(400).json({
                    msg: "Account already exists."
                })
            }
        })

    Admin.create(
        {
            email: email,
            password: hashedPass
        },
        (error, result) => {
            if (error) {
                return res.status(500).json({
                    msg: "Error adding new user, try again later"
                })
            }

            jwt.sign(
                {
                    id: result._id
                },
                process.env.SECRET_KEY,
                (error, token) => {
                    if (error) {
                        throw error
                    }
                    return res.json({
                        token: token,
                        msg: "New User added",
                        user: result
                    })

                }
            )
        }
    )
})

module.exports = router
