const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//importing Bus Faculty Model
const BusFaculty = require('../../model/busFacultyModel')

//route 'api/bus_faculty/data/all'
//GET req
//To get bus faculties info
router.get('/all', (req, res) => {
    BusFaculty.find((error, data) => {
        if (error) {
            return res.status(500).json({
                msg: "Failed to load data, try again later."
            })
        }

        return res.json({
            msg: "Data Load Sucessfully",
            busFaculties: data
        })
    })
})

//route 'api/bus_faculty/data/:busBranch'
//GET req
//To get bus faculties info for the given location

router.get('/:busBranch', (req, res) => {

    BusFaculty.find({ busBranch: req.params.busBranch }, { password: 0 }, (error, data) => {
        if (error) {
            return res.status(500).json({
                msg: "Failed to load data, try again later."
            })
        }

        return res.json({
            msg: "Data Load Sucessfully",
            busFaculties: data
        })
    })
})

//route 'api/bus_faculty/data/new'
//POST req
//To register new bus faculty info

router.post('/new', (req, res) => {
    const { name, email, password, busBranch } = req.body;

    if (!name || !email || !password || !busBranch) {
        return res.status(400).json({
            msg: "Enter all fields",
            error: true
        })
    }

    const hashedPass = bcrypt.hashSync(password, 10);

    BusFaculty.findOne({ email: email })

        .then(faculty => {
            if (faculty) {
                return res.status(400).json({
                    msg: "Faculty entry already exists",
                    error: true
                })
            }
        })

    BusFaculty.create(
        {
            name,
            email,
            password: hashedPass,
            busBranch
        },
        (error, data) => {
            if (error) {
                return res.status(500).json({
                    msg: "Error posting faculty entry.",
                    errro: true
                })
            }
            //creating jwt token
            jwt.sign(
                {
                    id: data._id
                },
                process.env.SECRET_KEY,
                (error, token) => {
                    if (error) {
                        throw error
                    }

                    return res.json({
                        token: token,
                        msg: "New Faculty added.",
                        busFaculty: data
                    })
                }
            )

        }
    )
})

module.exports = router