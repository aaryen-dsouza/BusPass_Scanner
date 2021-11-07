import React, { useState } from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Dialog,
    DialogTitle,
    Container,
    TextField,
    InputAdornment
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import useStyles from './style';
import { useDispatch } from 'react-redux';


function Navbar({ isLogin, setisLogin }) {
    const [loginInfo, setloginInfo] = useState({
        email: '',
        password: ''
    })
    const [showPassword, setshowPassword] = useState(false);
    const [error, seterror] = useState(null)
    const [emailError, setemailError] = useState(false);
    const [passError, setpassError] = useState(false);
    const dispatch = useDispatch();



    const classes = useStyles();



    const [open, setOpen] = useState(false);
    const handleShowPassword = () => setshowPassword(!showPassword)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleLogin = () => {
        handleOpen();
    }
    const handleLogout = () => {
        dispatch({
            type: 'LOGOUT'
        })
        setisLogin(false);
    }
    const onSubmit = (e) => {
        e.preventDefault();
        seterror(null);
        setemailError(false);
        setpassError(false);

        if (!loginInfo.email || !loginInfo.password) {
            seterror('Fill add the fields');
            if (loginInfo.email === '') {
                setemailError(true)
            }
            else {
                setpassError(true)
            }
        }
        else {

            const loginF = {
                ...loginInfo,
                type: 'ADMIN'
            }
            return fetch('api/auth/', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(loginF)
            })
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    if (data.error) {
                        seterror(data.msg)
                    }
                    else {
                        dispatch({
                            type: 'AUTH',
                            payload: data
                        })
                        setloginInfo({
                            email: '',
                            password: ''
                        })
                        setisLogin(true);
                        seterror(null);
                        handleClose();
                    }

                })
                .catch(err => console.log(err.message))
        }
    }


    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }} align='center'>
                            Admin Panel
                        </Typography>
                        {
                            isLogin ? (
                                <Button color="inherit" onClick={handleLogout} sx={{ marginRight: 2 }}>Log out</Button>
                            ) :
                                (

                                    <Button color="inherit" onClick={handleLogin} sx={{ marginRight: 2 }}>Log in</Button>
                                )
                        }
                    </Toolbar>
                </AppBar>

                <Dialog onClose={handleClose} open={open}>
                    <DialogTitle>Login</DialogTitle>
                    <Container>
                        <form autoComplete='off' noValidate onSubmit={onSubmit} className={classes.form}>
                            {
                                error ? <Typography variant='h6' color='red' gutterBottom align='center'>{error}</Typography> : null
                            }
                            <TextField
                                type='email'
                                name='email'
                                variant='outlined'
                                label='Email'
                                value={loginInfo.email}
                                onChange={(e) => setloginInfo({ ...loginInfo, email: e.target.value })}
                                sx={{ marginBottom: 2 }}
                                fullWidth
                                required
                                error={emailError}
                            />
                            <TextField
                                type={showPassword ? 'text' : 'password'}
                                name='password'
                                variant='outlined'
                                label='Password'
                                value={loginInfo.password}
                                onChange={(e) => setloginInfo({ ...loginInfo, password: e.target.value })}
                                sx={{ marginBottom: 2 }}
                                fullWidth
                                required
                                error={passError}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton onClick={handleShowPassword}>
                                                {
                                                    showPassword ? <Visibility /> : <VisibilityOff />
                                                }
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <Button variant='contained' type='submit'>Submit</Button>
                        </form>
                    </Container>
                </Dialog>
            </Box>
        </>
    )
}

export default Navbar
