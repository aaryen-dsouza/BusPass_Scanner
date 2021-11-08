import React from 'react';
import { View, Text, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import globalStyles from '../styles/globalStyles';

const AccountInfo = ({ navigation }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.authData);
    const userInfo = user.type === 'Student' ? user.student : user.busFaculty;

    console.log(userInfo);

    const logout = () => {
        dispatch({
            type: 'LOGOUT'
        });
        dispatch({
            type: 'ACCOUNT_SWITCH'
        })
        navigation.navigate('Role');
    }

    return (
        <View style={{ ...globalStyles.container, alignItems: 'center', justifyContent: 'center' }}>

            <Text>Account Info</Text>
            <Text style={{ fontSize: 22, fontFamily: 'Nunito-Regular' }}>{` Name: ${userInfo.name}`}</Text>
            {
                user.type === 'Student' && (
                    <Text style={{ fontSize: 22, fontFamily: 'Nunito-Regular' }}>{` Branch: ${userInfo.branch}`}</Text>
                )
            }
            <Text style={{ fontSize: 22, fontFamily: 'Nunito-Regular' }}>{` Bus Branch: ${userInfo.busBranch}`}</Text>
            {
                user.type === 'Student' && (
                    <>
                        {/* <Text style={{ fontSize: 22, fontFamily: 'Nunito-Regular' }}>{`Qr Valid Till: ${userInfo.qrValidTill}`}</Text> */}
                        {
                            userInfo.qrValid ? (
                                <Text style={{ fontSize: 22, fontFamily: 'Nunito-Regular', marginBottom: 20 }}>{`Qr Validity: Valid`}</Text>

                            ) : (
                                <Text style={{ fontSize: 22, fontFamily: 'Nunito-Regular', marginBottom: 20 }}>{`Qr Validity: Invalid`}</Text>

                            )
                        }
                    </>
                )
            }


            <Button title='Logout' color='#000' onPress={logout} />
        </View>
    )
}


export default AccountInfo
