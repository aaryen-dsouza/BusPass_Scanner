import React, { useState } from 'react';
import {
    Typography,
    Button,
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
import { DatePicker, LocalizationProvider } from '@mui/lab';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import useStyles from './style';
import { useDispatch } from 'react-redux';
import FileBase from 'react-file-base64';
import DateAdapter from '@mui/lab/AdapterMoment';

function EditForm(props) {
    const { editData, setEditData, formType, id, handleDialog } = props;
    const [showPassword, setshowPassword] = useState(false);
    const [error, seterror] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();
    // const handleShowPassword = () => setshowPassword(!showPassword);
    const handleSubmit = (e) => {
        e.preventDefault();
        seterror(null);
        if (formType === 'Student') {

            const formF = {
                ...editData,
                type: 'STUDENT'
            }
            return fetch('api/data/edit/' + id, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(formF)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        seterror(data.msg);
                        console.log(data.error);
                    }

                    else {
                        dispatch({
                            type: 'EDIT_STUDENT',
                            payload: data.result
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
                        seterror(null)
                        handleDialog();
                        console.log("Student updated.")
                    }
                })
                .catch(err => console.log(err.message))
        }

        else if (formType === 'Bus Faculty') {
            const formF = {
                ...editData,
                type: 'BUS_FACULTY'
            }
            return fetch('api/data/edit/' + id, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(formF)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        seterror(data.msg)
                    }

                    else {
                        dispatch({
                            type: 'EDIT_BUS_FACULTY',
                            payload: data.result
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
                        seterror(null)
                        handleDialog();
                        console.log("Faculty updated.")
                    }
                })
                .catch(err => console.log(err.message))
        }
        else {
            const formF = {
                ...editData,
                type: 'BUS_INFO'
            }
            return fetch('api/data/edit/' + id, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(formF)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        seterror(data.msg)
                    }

                    else {
                        dispatch({
                            type: 'EDIT_BUS',
                            payload: data.result
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
                        seterror(null)
                        handleDialog();
                        console.log("Bus info updated.")
                    }
                })
                .catch(err => console.log(err.message))
        }


    }
    return (
        <div style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '30px'
        }}>
            <LocalizationProvider dateAdapter={DateAdapter}>
                <Card sx={{
                    width: '100%'
                }}>
                    <CardContent>
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
                                    value={editData.name}
                                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
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
                                                value={editData.email}
                                                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                                                fullWidth
                                                required
                                            />
                                            {/* <TextField
                                                type={showPassword ? 'text' : 'password'}
                                                name='password'
                                                variant='outlined'
                                                label='Password'
                                                value={editData.password}
                                                onChange={(e) => setEditData({ ...editData, password: e.target.value })}
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
                                            /> */}
                                        </>
                                    ) : null
                                }
                                {
                                    formType === 'Student' && (
                                        <FormControl fullWidth sx={{ marginBottom: 2 }}>
                                            <InputLabel id="demo-simple-select-label">Branch</InputLabel>
                                            <Select
                                                value={editData.branch}
                                                label="Branch"
                                                onChange={(e) => setEditData({ ...editData, branch: e.target.value })}
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
                                        value={editData.busBranch}
                                        label="Bus Branch"
                                        onChange={(e) => setEditData({ ...editData, busBranch: e.target.value })}
                                    >
                                        <MenuItem value={'Borivali'}>Borivali</MenuItem>
                                        <MenuItem value={'Mira Road'}>Mira Road</MenuItem>
                                        <MenuItem value={'Vasai'}>Vasai</MenuItem>
                                    </Select>
                                </FormControl>
                                {
                                    formType === 'Student' && (
                                        <FormControl sx={{ marginBottom: 2 }}>
                                            <DatePicker
                                                label="Qr Valid Till"
                                                value={editData.qrValidTill}
                                                onChange={(newValue) => {
                                                    setEditData({ ...editData, qrValidTill: newValue });
                                                }}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </FormControl>
                                    )
                                }
                                {
                                    formType === 'Bus' && (
                                        <>
                                            <TextField
                                                variant='outlined'
                                                type='number'
                                                name='totalSeats'
                                                label='Total Seats'
                                                value={editData.totalSeats}
                                                onChange={(e) => setEditData({ ...editData, totalSeats: e.target.value, vacantSeats: e.target.value })}
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
                                                value={editData.vacantSeats}
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
                                            <FormGroup sx={{ marginBottom: 2 }}>
                                                <FormControlLabel control={<Switch inputProps={{ 'aria-label': 'controlled' }} checked={editData.qrValid} onChange={(e) => setEditData({ ...editData, qrValid: e.target.checked })} />} label="QR Valid" />
                                            </FormGroup>
                                        </>
                                    )
                                }
                                {/* <div className={classes.fileInput}>
                                    <FileBase
                                        type="file"
                                        multiple={false}
                                        onDone={({ base64 }) => setEditData({ ...editData, image: base64 })}
                                    />
                                </div> */}
                                <Button variant='contained' type='submit'>Save Changes</Button>
                            </form>
                        </Container>
                    </CardContent>
                </Card>
            </LocalizationProvider>
        </div>
    )
}

export default EditForm

