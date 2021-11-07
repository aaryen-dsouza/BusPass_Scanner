import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography
} from '@mui/material'
import Navbar from '../Navbar/Navbar';
import useStyles from './style';
import { useDispatch } from 'react-redux';
import AdminPanel from '../AdminPanel/AdminPanel';


function Home() {
    const dispatch = useDispatch();
    const [isLogin, setisLogin] = useState(false);

    useEffect(() => {
        loadUser();
    }, [])

    const loadUser = () => {
        // console.log('loaduser triggered.')
        const token = localStorage.getItem('profile');
        if (token) {
            fetch('api/auth/', {
                method: 'GET',
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "type": "ADMIN"
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        console.log(data.msg);
                    }
                    else {
                        dispatch({
                            type: 'LOAD_USER',
                            payload: data
                        })
                        setisLogin(true)
                    }
                })
                .catch(err => console.log(err.message))
        }
    }

    const classes = useStyles();
    return (
        <>
            <Navbar isLogin={isLogin} setisLogin={setisLogin} />
            {
                isLogin ? (

                    <AdminPanel />

                ) : (
                    <Container>
                        <div className={classes.noAuthContainer}>
                            <Typography variant='h5' color='GrayText'> Make sure you are logged in.</Typography>
                        </div>
                    </Container>

                )
            }

        </>
    )
}

export default Home
