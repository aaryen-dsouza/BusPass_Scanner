import React, { useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent
} from '@mui/material';
import useStyles from '../Borivali/style';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditForm from '../Form/EditForm';

function MiraRoad(props) {
    const { students, faculties, buses, editData, setEditData, formType, setformType, open, handleDialog, deleteUser } = props;
    const [selectedUser, setselectedUser] = useState({});

    const classes = useStyles();
    const handleEdit = async (data, type) => {
        setformType(type);
        setEditData(data);
        setselectedUser(data);
        handleDialog();
    }
    return (
        <>
            <div style={{ width: '100%' }}>
                <TableContainer component={Paper} sx={{ width: '80%', margin: ' 30px auto' }}>
                    <Typography variant='h6' align='center'>Students</Typography>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                                            <span className={classes.name}>
                                                {student.name}
                                                <span className={classes.icons}>
                                                    <IconButton size='small' onClick={() => handleEdit(student, 'Student')}>
                                                        <EditIcon fontSize='small' sx={{ marginRight: 1 }} />
                                                    </IconButton>
                                                    <IconButton onClick={() => deleteUser(student._id, 'Student')}>
                                                        <DeleteIcon fontSize='small' className={classes.icons} />
                                                    </IconButton> </span>
                                            </span>
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
                <TableContainer component={Paper} sx={{ width: '80%', margin: ' 30px auto' }}>
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
                                            <span className={classes.name}>
                                                {faculty.name}
                                                <span className={classes.icons}>
                                                    <IconButton size='small' onClick={() => handleEdit(faculty, 'Bus Faculty')}>
                                                        <EditIcon fontSize='small' sx={{ marginRight: 1 }} />
                                                    </IconButton>
                                                    <IconButton onClick={() => deleteUser(faculty._id, 'Bus Faculty')}>
                                                        <DeleteIcon fontSize='small' className={classes.icons} />
                                                    </IconButton>
                                                </span>
                                            </span>
                                        </TableCell>
                                        <TableCell align="center">{faculty.email}</TableCell>
                                        <TableCell align="right">{faculty.busBranch}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TableContainer component={Paper} sx={{ width: '80%', margin: ' 30px auto' }}>
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
                                            <span className={classes.name}>
                                                {bus.name}
                                                <span className={classes.icons}>
                                                    <IconButton size='small' onClick={() => handleEdit(bus, 'Bus')}>
                                                        <EditIcon fontSize='small' sx={{ marginRight: 1 }} />
                                                    </IconButton>
                                                    <IconButton onClick={() => deleteUser(bus._id, 'Bus')}>
                                                        <DeleteIcon fontSize='small' className={classes.icons} />
                                                    </IconButton>
                                                </span>
                                            </span>
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
            <Dialog open={open} onClose={handleDialog}>
                <DialogTitle>Edit</DialogTitle>
                <DialogContent>
                    <EditForm
                        editData={editData}
                        setEditData={setEditData}
                        formType={formType}
                        id={selectedUser._id}
                        handleDialog={handleDialog}
                    />
                </DialogContent>
            </Dialog>
        </>
    )
}

export default MiraRoad;
