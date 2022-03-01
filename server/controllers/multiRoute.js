
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//importing Student Model
const Students = require('../model/studentModel');
const BusFaculty = require('../model/busFacultyModel');
const BusInfo = require('../model/busInfoModel');
const Admin = require('../model/adminModel');

const getAll = (req, res) => {
    const { type } = req.headers;

    if (!type) {
        return res.status(400).json({
            error: true,
            msg: 'Type of role is not passed.'
        })
    }

    if (type === 'STUDENT') {
        Students.find((error, data) => {
            if (error) {
                return res.status(500).json({
                    msg: "Failed to load data, try again later.",
                    error: true
                })
            }

            return res.json({
                msg: "Data Load Sucessfully",
                students: data
            })
        })
    }

    else if (type === 'BUS_FACULTY') {
        BusFaculty.find((error, data) => {
            if (error) {
                return res.status(500).json({
                    msg: "Failed to load data, try again later.",
                    error: true
                })
            }

            return res.json({
                msg: "Data Load Sucessfully",
                busFaculties: data
            })
        })
    }

    else if (type === 'BUS_INFO') {
        BusInfo.find((error, data) => {
            if (error) {
                return res.status(500).json({
                    msg: "Failed to load data, try again later.",
                    error: true
                })
            }

            return res.json({
                msg: "Data Load Sucessfully",
                buses: data
            })
        })
    }

    else if (type === 'ADMIN') {
        Admin.find((error, response) => {
            if (error) {
                return res.status(500).json({
                    msg: "Data load error, try again later",
                    error: true
                })
            }

            return res.json({
                msg: "Data load success",
                admin: response
            })
        })
    }

    else {
        return res.status(400).json({
            error: true,
            msg: ' Invalid roletype passed.'
        })
    }
}

const getByBranch = (req, res) => {
    const { type } = req.headers;

    if (!type) {
        return res.status(400).json({
            error: true,
            msg: 'Type of role is not passed.'
        })
    }

    if (type === 'STUDENT') {
        Students.find({ busBranch: req.params.busBranch }, { password: 0 }, (error, data) => {
            if (error) {
                return res.status(500).json({
                    msg: "Failed to load data, try again later.",
                    error: true
                })
            }

            return res.json({
                msg: "Data Load Sucessfully",
                students: data
            })
        })
    }

    else if (type === 'BUS_FACULTY') {
        BusFaculty.find({ busBranch: req.params.busBranch }, { password: 0 }, (error, data) => {
            if (error) {
                return res.status(500).json({
                    msg: "Failed to load data, try again later.",
                    error: true
                })
            }

            return res.json({
                msg: "Data Load Sucessfully",
                busFaculties: data
            })
        })
    }

    else if (type === 'BUS_INFO') {
        BusInfo.find({ busBranch: req.params.busBranch }, (error, data) => {
            if (error) {
                return res.status(500).json({
                    msg: "Failed to load data, try again later.",
                    error: true
                })
            }

            return res.json({
                msg: "Data Load Sucessfully",
                buses: data
            })
        })
    }

    else {
        return res.status(400).json({
            error: true,
            msg: ' Invalid role type passed.'
        })
    }
}

const post = (req, res) => {
    const { type } = req.body;

    if (!type) {
        return res.status(400).json({
            error: true,
            msg: 'Type of role is not passed.'
        })
    }

    if (type === 'STUDENT') {
        const { name, email, password, branch, busBranch, qrValid, qrValidTill } = req.body;

        if (!name || !email || !password || !branch || !busBranch || !qrValid || !qrValidTill) {
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
                qrValid,
                qrValidTill
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
    }

    else if (type === 'BUS_FACULTY') {
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
    }

    else if (type === 'BUS_INFO') {
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

    }

    else if (type === 'ADMIN') {
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
    }

    else {
        return res.status(400).json({
            error: true,
            msg: ' Invalid role type passed.'
        })
    }
}

const put = (req, res) => {
    const { type } = req.body;

    if (!type) {
        return res.status(400).json({
            error: true,
            msg: 'Type of role is not passed.'
        })
    }

    if (type === 'STUDENT') {
        const { name, email, branch, busBranch, qrValid } = req.body;
        const id = req.params.id;

        if (!name, !email, !branch, !busBranch) {
            return res.status(400).json({
                msg: 'Enter all fields',
                error: true
            })
        }
        Students.findById(id)
            .then(student => {
                if (!student) {
                    return res.status(400).json({
                        msg: 'No student with such id found.',
                        error: true
                    })
                }

                Students.findByIdAndUpdate(
                    id,
                    {
                        name,
                        email,
                        branch,
                        busBranch,
                        qrValid
                    },
                    {
                        new: true
                    },
                    (error, result) => {
                        if (error) {
                            return res.status(500).json({
                                msg: 'Error updating',
                                error: error
                            })
                        }

                        return res.json({
                            msg: 'Student updated.',
                            result
                        })
                    }
                )
            })
    }
    else if (type === 'BUS_FACULTY') {
        const { name, email, busBranch } = req.body;
        const id = req.params.id;

        if (!name, !email, !busBranch) {
            return res.status(400).json({
                msg: 'Enter all fields',
                error: true
            })
        }
        BusFaculty.findById(id)
            .then(faculty => {
                if (!faculty) {
                    return res.status(400).json({
                        msg: 'No faculty with such id found.',
                        error: true
                    })
                }

                BusFaculty.findByIdAndUpdate(
                    id,
                    {
                        name,
                        email,
                        busBranch
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
                            msg: 'Faculty info updated.',
                            result
                        })
                    }
                )
            })
    }
    else if (type === 'BUS_INFO') {
        const { name, busBranch, vacantSeats, totalSeats } = req.body;
        const id = req.params.id;

        if (!name, !busBranch, !vacantSeats, !totalSeats) {
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
                            msg: 'Bus info updated.',
                            result
                        })
                    }
                )
            })

    }
    else {
        return res.status(400).json({
            error: true,
            msg: ' Invalid role type passed.'
        })
    }
}

const delet = (req, res) => {
    const { type } = req.headers;

    if (!type) {
        return res.status(400).json({
            error: true,
            msg: 'Type of role is not passed.'
        })
    }

    if (type === 'STUDENT') {
        const id = req.params.id;

        if (!id) {
            return res.status(500).json({
                error: true,
                msg: 'Id not passed'
            })
        }

        Students.findByIdAndDelete(id,
            {
                new: true
            },
            (error, result) => {
                if (error) {
                    return res.status(500).json({
                        error: true,
                        msg: 'Erro deleting student'
                    })
                }

                return res.json({
                    msg: "Student deleted",
                    result
                })
            })
    }

    else if (type === 'BUS_FACULTY') {
        const id = req.params.id;

        if (!id) {
            return res.status(500).json({
                error: true,
                msg: 'Id not passed'
            })
        }

        BusFaculty.findByIdAndDelete(id,
            {
                new: true
            },
            (error, result) => {
                if (error) {
                    return res.status(500).json({
                        error: true,
                        msg: 'Error deleting faculty info'
                    })
                }

                return res.json({
                    msg: "Faculty Info deleted",
                    result
                })
            })
    }

    else if (type === 'BUS_INFO') {
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
    }

    else {
        return res.status(400).json({
            error: true,
            msg: ' Invalid role type passed.'
        })
    }



}

module.exports = {
    getAll,
    getByBranch,
    post,
    put,
    delet
}

