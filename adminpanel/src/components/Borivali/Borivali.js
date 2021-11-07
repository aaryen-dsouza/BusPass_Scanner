import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography
} from '@mui/material';


function Borivali(props) {
    const { students, faculties, buses } = props;
    return (
        <div style={{ width: '100%' }}>
            <TableContainer component={Paper} sx={{ width: '80%', margin: '30px auto' }}>
                <Typography variant='h6' align='center'>Students</Typography>
                <Table sx={{ minWidth: 650, marginLeft: 'auto', marginRight: 'auto' }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="right">Branch</TableCell>
                            <TableCell align="right">Bus Branch</TableCell>
                            <TableCell align="right">QR Valid</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            students.map(student => (
                                <TableRow
                                    key={student._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {student.name}
                                    </TableCell>
                                    <TableCell align="center">{student.email}</TableCell>
                                    <TableCell align="right">{student.branch}</TableCell>
                                    <TableCell align="right">{student.busBranch}</TableCell>
                                    <TableCell align="right">{student.qrValid ? 'Valid' : 'Invalid'}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>




            <TableContainer component={Paper} sx={{ width: '80%', margin: '30px auto' }}>
                <Typography variant='h6' align='center'>Bus Faculties</Typography>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="right">Bus Branch</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            faculties.map(faculty => (
                                <TableRow
                                    key={faculty._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {faculty.name}
                                    </TableCell>
                                    <TableCell align="center">{faculty.email}</TableCell>
                                    <TableCell align="right">{faculty.busBranch}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TableContainer component={Paper} sx={{ width: '80%', margin: '30px auto' }}>
                <Typography variant='h6' align='center'>Buses</Typography>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Bus Branch</TableCell>
                            <TableCell align="right">Vacant Seats</TableCell>
                            <TableCell align="right">Total Seats</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            buses.map(bus => (
                                <TableRow
                                    key={bus._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {bus.name}
                                    </TableCell>
                                    <TableCell align="right">{bus.busBranch}</TableCell>
                                    <TableCell align="right">{bus.vacantSeats}</TableCell>
                                    <TableCell align="right">{bus.totalSeats}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Borivali
