//importing Models and middleware
const Students = require('../model/studentModel');
const BusFaculty = require('../model/busFacultyModel');
const Admin = require('../model/adminModel');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const login = (req, res) => {
    const { type } = req.body;

    if (!type) {
        return res.status(400).json({
            error: true,
            msg: 'Type of role is not passed'
        })
    }

    if (type === 'STUDENT') {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                msg: "Fill all the fields",
                error: true
            })
        }
        Students.findOne({ email: email })

            .then(student => {
                if (!student) {
                    return res.status(400).json({
                        msg: "Make sure you've entered the registered email",
                        error: true
                    })
                }

                //validating password
                const match = bcrypt.compareSync(password, student.password);

                if (!match) {
                    return res.status(400).json({
                        msg: "Wrong password",
                        error: true
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
                            student: student,
                            type: 'Student'
                        })
                    }
                )
            })
    }

    else if (type === 'BUS_FACULTY') {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                msg: "Fill all the fields",
                error: true
            })
        }
        BusFaculty.findOne({ email: email })

            .then(faculty => {
                if (!faculty) {
                    return res.status(400).json({
                        msg: "Make sure you've entered the registered email",
                        error: true
                    })
                }

                //validating password
                const match = bcrypt.compareSync(password, faculty.password);

                if (!match) {
                    return res.status(400).json({
                        msg: "Wrong password",
                        error: true
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
                            busFaculty: faculty,
                            type: 'Bus Faculty'
                        })
                    }
                )
            })
    }

    else if (type === 'ADMIN') {
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
    }

    else {
        return res.status(400).json({
            error: true,
            msg: ' Invalid roletype passed.'
        })
    }
}

const getUser = (req, res) => {
    const { type } = req.headers;

    if (!type) {
        return res.status(400).json({
            error: true,
            msg: 'Type of role is not passed'
        })
    }

    if (type === 'STUDENT') {
        Students.findById(req.user.id)
            .then(student => {

                if (!student) {
                    return res.status(400).json({
                        msg: 'No student with the given id.',
                        error: true
                    })
                }
                return res.json({
                    student: student,
                    type: 'Student'
                })
            })
    }

    else if (type === 'BUS_FACULTY') {
        BusFaculty.findById(req.user.id)
            .then(faculty => {

                if (!faculty) {
                    return res.status(400).json({
                        msg: 'No bus faculty with the given id.',
                        error: true
                    })
                }
                return res.json({
                    busFaculty: faculty,
                    type: 'Bus Faculty'
                })
            })
    }

    else if (type === 'ADMIN') {
        Admin.findById(req.user.id)
            .then(admin => {

                if (!admin) {
                    return res.status(400).json({
                        msg: 'No admin with the given id.',
                        error: true
                    })
                }
                return res.json({
                    admin: admin.email
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

module.exports = {
    login,
    getUser
}