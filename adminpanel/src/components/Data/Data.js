import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
    ButtonGroup,
    Button
} from '@mui/material';
import Vasai from '../Vasai/Vasai';
import Borivali from '../Borivali/Borivali';
import MiraRoad from '../Mira Road/MiraRoad';
import { useDispatch } from 'react-redux';


function Data(props) {
    const [busBranch, setbusBranch] = useState('Borivali');
    const students = useSelector(state => state.students);
    const busFaculties = useSelector(state => state.busFaculties);
    const buses = useSelector(state => state.buses);
    const [open, setOpen] = React.useState(false);
    const [formType, setformType] = useState('');
    const [editData, setEditData] = useState({
        name: '',
        email: '',
        password: '',
        branch: '',
        busBranch: '',
        vacantSeats: 0,
        totalSeats: 0,
        image: '',
        qrValid: true,
        qrValidTill: null,
    });
    const handleDialog = () => setOpen(!open);
    const dispatch = useDispatch();

    const deleteUser = (id, type) => {

        if (type === 'Student') {
            fetch('/api/data/delete/' + id, {
                method: 'DELETE',
                headers: {
                    "type": "STUDENT"
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        console.log(data.msg)
                    }
                    else {
                        dispatch({
                            type: 'DELETE_STUDENT',
                            payload: id
                        })
                        setEditData({
                            name: '',
                            email: '',
                            password: '',
                            branch: '',
                            busBranch: '',
                            vacantSeats: 0,
                            totalSeats: 0,
                            image: '',
                            qrValid: true,
                            qrValidTill: null,
                        })
                        console.log('Student deleted')
                    }
                })
                .catch(err => console.log(err.message))

        }
        else if (type === 'Bus Faculty') {
            fetch('/api/data/delete/' + id, {
                method: 'DELETE',
                headers: {
                    "type": "BUS_FACULTY"
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        console.log(data.msg)
                    }
                    else {
                        dispatch({
                            type: 'DELETE_BUS_FACULTY',
                            payload: id
                        })
                        setEditData({
                            name: '',
                            email: '',
                            password: '',
                            branch: '',
                            busBranch: '',
                            vacantSeats: 0,
                            totalSeats: 0,
                            image: '',
                            qrValid: true,
                            qrValidTill: null,
                        })
                        console.log('Faculty deleted')
                    }
                })
                .catch(err => console.log(err.message))
        }
        else {
            fetch('/api/data/delete/' + id, {
                method: 'DELETE',
                headers: {
                    "type": "BUS_INFO"
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        console.log(data.msg)
                    }
                    else {
                        dispatch({
                            type: 'DELETE_BUS',
                            payload: id
                        })

                        console.log('Bus Info deleted')
                    }
                })
                .catch(err => console.log(err.message))
        }
    }


    //Filtering borivali people
    const borivaliStudents = students.students.filter(student => student.busBranch === 'Borivali');
    const borivaliFaculties = busFaculties.busFaculties.filter(faculty => faculty.busBranch === 'Borivali');
    const borivaliBuses = buses.buses.filter(bus => bus.busBranch === 'Borivali');

    //Filtering mira road people
    const miraRoadStudents = students.students.filter(student => student.busBranch === 'Mira Road');
    const miraRoadFaculties = busFaculties.busFaculties.filter(faculty => faculty.busBranch === 'Mira Road');
    const miraRoadBuses = buses.buses.filter(bus => bus.busBranch === 'Mira Road');

    //Filtering vasavasai
    const vasaiStudents = students.students.filter(student => student.busBranch === 'Vasai');
    const vasaiFaculties = busFaculties.busFaculties.filter(faculty => faculty.busBranch === 'Vasai');
    const vasaiBuses = buses.buses.filter(bus => bus.busBranch === 'Vasai');

    return (
        <>
            <div style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
                marginTop: '50px'
            }}>
                <ButtonGroup variant="text">
                    <Button onClick={() => setbusBranch('Borivali')}>Borivali</Button>
                    <Button onClick={() => setbusBranch('Mira Road')}>Mira Road</Button>
                    <Button onClick={() => setbusBranch('Vasai')}>Vasai</Button>
                </ButtonGroup>
            </div>
            {
                busBranch === 'Borivali' && (
                    <Borivali
                        students={borivaliStudents}
                        faculties={borivaliFaculties}
                        buses={borivaliBuses}
                        editData={editData}
                        setEditData={setEditData}
                        formType={formType}
                        setformType={setformType}
                        open={open}
                        handleDialog={handleDialog}
                        deleteUser={deleteUser}
                    />
                )
            }
            {
                busBranch === 'Mira Road' && (
                    <MiraRoad
                        students={miraRoadStudents}
                        faculties={miraRoadFaculties}
                        buses={miraRoadBuses}
                        editData={editData}
                        setEditData={setEditData}
                        formType={formType}
                        setformType={setformType}
                        open={open}
                        handleDialog={handleDialog}
                        deleteUser={deleteUser}
                    />
                )
            }
            {
                busBranch === 'Vasai' && (
                    <Vasai
                        students={vasaiStudents}
                        faculties={vasaiFaculties}
                        buses={vasaiBuses}
                        editData={editData}
                        setEditData={setEditData}
                        formType={formType}
                        setformType={setformType}
                        open={open}
                        handleDialog={handleDialog}
                        deleteUser={deleteUser}
                    />
                )
            }
        </>
    )
}

export default Data;
