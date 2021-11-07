import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchStudents } from '../../actions/studentActions';
import { fetchBuses } from '../../actions/busActions';
import { fetchBusFaculties } from '../../actions/busFacultyActions';

import Data from '../Data/Data';
import RegisterForm from '../Form/RegisterForm';



function AdminPanel() {
    const dispatch = useDispatch();



    useEffect(() => {
        dispatch(fetchStudents());
        dispatch(fetchBuses());
        dispatch(fetchBusFaculties());
    }, [])
    return (
        <>
            <div style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '30px'
            }}>

                <RegisterForm />

            </div>
            <Data />
        </>
    )
}

export default AdminPanel
