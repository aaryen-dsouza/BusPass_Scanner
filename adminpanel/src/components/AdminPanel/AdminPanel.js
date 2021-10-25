import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchStudents } from '../../actions/studentActions';
import { fetchBuses } from '../../actions/busActions';
import { fetchBusFaculties } from '../../actions/busFacultyActions';
import Form from '../Form/Form';
import Data from '../Data/Data';


function AdminPanel() {
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchStudents());
        dispatch(fetchBuses());
        dispatch(fetchBusFaculties());
    }, [])
    return (
        <>
            <Form />
            <Data />
        </>
    )
}

export default AdminPanel
