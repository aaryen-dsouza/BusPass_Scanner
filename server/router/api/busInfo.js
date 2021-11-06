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

//route 'api/bus_info/data/edit/:id'
//PUT req
//To edit bus info
router.put('/edit/:id',
    (req, res) => {

        const { name, busBranch, image, vacantSeats, totalSeats } = req.body;
        const id = req.params.id;

        if (!name, !busBranch, !image, !vacantSeats, !totalSeats) {
            return res.status(400).json({
                msg: 'Enter all fields',
                error: true
            })
        }
        BusInfo.findById(id)
            .then(bus => {
                if (!bus) {
                    return res.status(400).json({
                        msg: 'No student with such id found.',
                        error: true
                    })
                }

                BusInfo.findByIdAndUpdate(
                    id,
                    {
                        name,
                        busBranch,
                        image,
                        vacantSeats,
                        totalSeats
                    },
                    {
                        new: true
                    },
                    (error, result) => {
                        if (error) {
                            return res.status(500).json({
                                msg: 'Error updating',
                                error: true
                            })
                        }

                        return res.json({
                            msg: 'Student updated.',
                            result
                        })
                    }
                )
            })
    })

//route 'api/bus_info/data/delete/:id'
//DELETE req
//To DELETE bus info

router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(500).json({
            error: true,
            msg: 'Id not passed'
        })
    }

    BusInfo.findByIdAndDelete(id,
        {
            new: true
        },
        (error, result) => {
            if (error) {
                return res.status(500).json({
                    error: true,
                    msg: 'Erro deleting busInfo'
                })
            }

            return res.json({
                msg: "Bus Info deleted",
                result
            })
        })
})


module.exports = router;