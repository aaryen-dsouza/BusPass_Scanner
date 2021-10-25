import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
    ButtonGroup,
    Button
} from '@mui/material';
import Vasai from '../Vasai/Vasai';
import Borivali from '../Borivali/Borivali';
import MiraRoad from '../Mira Road/MiraRoad';

function Data() {
    const [busBranch, setbusBranch] = useState('Borivali');
    const students = useSelector(state => state.students);
    const busFaculties = useSelector(state => state.busFaculties);
    const buses = useSelector(state => state.buses);

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
                        buses={borivaliBuses} />
                )
            }
            {
                busBranch === 'Mira Road' && (
                    <MiraRoad
                        students={miraRoadStudents}
                        faculties={miraRoadFaculties}
                        buses={miraRoadBuses}
                    />
                )
            }
            {
                busBranch === 'Vasai' && (
                    <Vasai
                        students={vasaiStudents}
                        faculties={vasaiFaculties}
                        buses={vasaiBuses}
                    />
                )
            }
        </>
    )
}

export default Data;
