const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//importing Student Model
const Students = require('../../model/studentModel');
const auth = require('../../middlewares/auth');

//route 'api/students/data/all'
//GET req
//To get bus student info
router.get('/all', auth, (req, res) => {
    Students.find((error, data) => {
        if (error) {
            return res.status(500).json({
                msg: "Failed to load data, try again later."
            })
        }

        return res.json({
            msg: "Data Load Sucessfully",
            students: data
        })
    })
})

//route 'api/students/data/:busBranch'
//GET req
//To get student info of students travelling to the same location

router.get('/:busBranch', auth, (req, res) => {

    Students.find({ busBranch: req.params.busBranch }, { password: 0 }, (error, data) => {
        if (error) {
            return res.status(500).json({
                msg: "Failed to load data, try again later."
            })
        }

        return res.json({
            msg: "Data Load Sucessfully",
            students: data
        })
    })
})



//route 'api/students/data/new'
//POST req
//To register new bus student info

router.post('/new', (req, res) => {
    const { name, email, password, branch, busBranch, qrValid } = req.body;

    if (!name || !email || !password || !branch || !busBranch) {
        return res.status(400).json({
            msg: "Enter all fields",
            error: true
        })
    }

    const hashedPass = bcrypt.hashSync(password, 10);

    Students.findOne({ email: email })

        .then(student => {
            if (student) {
                return res.status(400).json({
                    msg: "Student entry already exists",
                    error: true
                })
            }
        })

    Students.create(
        {
            name,
            email,
            password: hashedPass,
            branch,
            busBranch,
            qrValid
        },
        (error, data) => {
            if (error) {
                return res.status(500).json({
                    msg: "Error posting student entry.",
                    error: true
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
                        msg: "New Student added.",
                        student: data
                    })
                }
            )

        }
    )
})

module.exports = router;