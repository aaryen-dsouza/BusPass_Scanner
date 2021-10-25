import React, { useState } from 'react';
import {
    Typography,
    Button,
    ButtonGroup,
    Card,
    CardContent,

    TextField,
    IconButton,
    InputAdornment,
    FormControl,
    FormControlLabel,
    FormGroup,
    Switch,
    InputLabel,
    MenuItem,
    Select,
    Container
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import useStyles from './style';
import { useDispatch } from 'react-redux';



function Form() {
    const [formType, setformType] = useState('Student');
    const [formData, setformData] = useState({
        name: '',
        email: '',
        password: '',
        branch: '',
        busBranch: '',
        vacantSeats: 0,
        totalSeats: 0,
        qrValid: true

    });
    const [showPassword, setshowPassword] = useState(false);
    const [error, seterror] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        seterror(null);


        if (formType === 'Student') {
            return fetch('api/students/data/new', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        seterror(data.msg)
                    }

                    else {
                        dispatch({
                            type: 'ADD_STUDENT',
                            payload: data.student
                        })
                        setformData({
                            name: '',
                            email: '',
                            password: '',
                            branch: '',
                            busBranch: '',
                            vacantSeats: 0,
                            totalSeats: 0,
                            qrValid: true
                        })
                        seterror(null)
                        console.log("Student registered.")
                    }
                })
                .catch(err => console.log(err.message))
        }

        else if (formType === 'Bus Faculty') {

            return fetch('api/bus_faculty/data/new', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        seterror(data.msg)
                    }

                    else {
                        dispatch({
                            type: 'ADD_BUS_FACULTY',
                            payload: data.busFaculty
                        })
                        setformData({
                            name: '',
                            email: '',
                            password: '',
                            branch: '',
                            busBranch: '',
                            vacantSeats: 0,
                            totalSeats: 0,
                            qrValid: true
                        })
                        seterror(null)
                        console.log("Bus Faculty registered.")
                    }
                })
                .catch(err => console.log(err.message))
        }
        else {
            return fetch('api/bus_info/data/new', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        seterror(data.msg)
                    }

                    else {
                        dispatch({
                            type: 'ADD_BUS',
                            payload: data.bus
                        })
                        setformData({
                            name: '',
                            email: '',
                            password: '',
                            branch: '',
                            busBranch: '',
                            vacantSeats: 0,
                            totalSeats: 0,
                            qrValid: true
                        })
                        seterror(null);
                        console.log('Bus registered')
                    }
                })
                .catch(err => console.log(err.message))
        }


    }
    const handleShowPassword = () => setshowPassword(!showPassword);
    return (
        <div style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            marginTop: '50px'
        }}
        >
            <Card sx={{
                width: '45%'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    marginTop: '20px'
                }}>
                    <ButtonGroup variant="outlined">
                        <Button onClick={() => { setformType('Student'); seterror(null); }}>Student</Button>
                        <Button onClick={() => { setformType('Bus Faculty'); seterror(null); }}>Bus Faculty</Button>
                        <Button onClick={() => { setformType('Bus'); seterror(null); }}>Bus</Button>
                    </ButtonGroup>
                </div>
                <CardContent>
                    <Typography variant='h4' align='center' className={classes.title} gutterBottom>Register</Typography>
                    {
                        error && <Typography variant='h6' align='center' color='red' gutterBottom>{error}</Typography>
                    }
                    <Container>
                        <form noValidate autoComplete='off' onSubmit={handleSubmit} className={classes.form}>
                            <TextField
                                name='name'
                                variant='outlined'
                                label='Name'
                                sx={{
                                    marginBottom: 2
                                }}
                                value={formData.name}
                                onChange={(e) => setformData({ ...formData, name: e.target.value })}
                                fullWidth
                                required
                            />
                            {
                                formType === 'Student' || formType === 'Bus Faculty' ? (
                                    <>
                                        <TextField
                                            type='email'
                                            name='email'
                                            variant='outlined'
                                            label='Email'
                                            sx={{
                                                marginBottom: 2
                                            }}
                                            value={formData.email}
                                            onChange={(e) => setformData({ ...formData, email: e.target.value })}
                                            fullWidth
                                            required
                                        />
                                        <TextField
                                            type={showPassword ? 'text' : 'password'}
                                            name='password'
                                            variant='outlined'
                                            label='Password'
                                            value={formData.password}
                                            onChange={(e) => setformData({ ...formData, password: e.target.value })}
                                            sx={{ marginBottom: 2 }}
                                            fullWidth
                                            required
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
                                    </>
                                ) : null
                            }
                            {
                                formType === 'Student' && (
                                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                                        <InputLabel id="demo-simple-select-label">Branch</InputLabel>
                                        <Select
                                            value={formData.branch}
                                            label="Branch"
                                            onChange={(e) => setformData({ ...formData, branch: e.target.value })}
                                        >
                                            <MenuItem value={'Computer'}>Computer</MenuItem>
                                            <MenuItem value={'IT'}>IT</MenuItem>
                                            <MenuItem value={'Civil'}>Civil</MenuItem>

                                        </Select>
                                    </FormControl>
                                )
                            }
                            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                                <InputLabel id="demo-simple-select-label">Bus Branch</InputLabel>
                                <Select
                                    value={formData.busBranch}
                                    label="Bus Branch"
                                    onChange={(e) => setformData({ ...formData, busBranch: e.target.value })}
                                >
                                    <MenuItem value={'Borivali'}>Borivali</MenuItem>
                                    <MenuItem value={'Mira Road'}>Mira Road</MenuItem>
                                    <MenuItem value={'Vasai'}>Vasai</MenuItem>
                                </Select>
                            </FormControl>
                            {
                                formType === 'Bus' && (
                                    <>
                                        <TextField
                                            variant='outlined'
                                            type='number'
                                            name='totalSeats'
                                            label='Total Seats'
                                            value={formData.totalSeats}
                                            onChange={(e) => setformData({ ...formData, totalSeats: e.target.value, vacantSeats: e.target.value })}
                                            sx={{
                                                marginBottom: 2
                                            }}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                            fullWidth
                                            required
                                        />
                                        <TextField
                                            variant='outlined'
                                            type='number'
                                            name='vacantSeats'
                                            label='Vacant Seats'
                                            value={formData.vacantSeats}
                                            sx={{
                                                marginBottom: 2
                                            }}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                            fullWidth
                                            required
                                        />
                                    </>
                                )
                            }
                            {
                                formType === 'Student' && (
                                    <>
                                        {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                label="Qr Valid till"
                                                value={formData.qrValidTill}
                                                onChange={(newValue) => {
                                                    setformData({ ...formData, qrValidTill: newValue });
                                                }}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider> */}
                                        <FormGroup sx={{ marginBottom: 2 }}>
                                            <FormControlLabel control={<Switch inputProps={{ 'aria-label': 'controlled' }} checked={formData.qrValid} onChange={(e) => setformData({ ...formData, qrValid: e.target.checked })} />} label="QR Valid" />
                                        </FormGroup>
                                    </>
                                )
                            }
                            <Button variant='contained' type='submit'>Submit</Button>
                        </form>
                    </Container>
                </CardContent>
            </Card>
        </div>



    )
}

export default Form
