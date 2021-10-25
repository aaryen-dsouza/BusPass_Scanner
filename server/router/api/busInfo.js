const express = require('express');
const auth = require('../../middlewares/auth');
const router = express.Router();

//importing Bus Info Model
const BusInfo = require('../../model/busInfoModel');

//route 'api/bus_info/data/all'
//GET req
//To get all bus info
//Private Route
router.get('/all', auth, (req, res) => {
    BusInfo.find((error, data) => {
        if (error) {
            return res.status(500).json({
                msg: "Failed to load data, try again later."
            })
        }

        return res.json({
            msg: "Data Load Sucessfully",
            buses: data
        })
    })
})

//route 'api/bus_info/data/:busBranch'
//GET req
//To get student info of buses travelling to the same location
//Private Route

router.get('/:busBranch', auth, (req, res) => {

    BusInfo.find({ busBranch: req.params.busBranch }, (error, data) => {
        if (error) {
            return res.status(500).json({
                msg: "Failed to load data, try again later."
            })
        }

        return res.json({
            msg: "Data Load Sucessfully",
            buses: data
        })
    })
})

//route 'api/bus_info/data/new'
//POST req
//To register new bus student info
//Private Route

router.post('/new', (req, res) => {
    const { name, busBranch, vacantSeats, totalSeats } = req.body;

    if (!name || !busBranch || !vacantSeats || !totalSeats) {
        return res.status(400).json({
            msg: "Enter all fields",
            error: true
        })
    }

    BusInfo.create(
        {
            name,
            busBranch,
            vacantSeats,
            totalSeats
        },
        (error, data) => {
            if (error) {
                return res.status(500).json({
                    msg: "Error posting bus entry.",
                    error: true
                })
            }

            return res.json({
                msg: "New Bus added.",
                bus: data
            })
        }
    )
})


module.exports = router;