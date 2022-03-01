import React, { useState } from 'react'
import { View, Text, Alert, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import globalStyles from '../styles/globalStyles';
import { Image, ListItem } from 'react-native-elements';
import { baseUrl } from '../baseUrl';

const VacancyOfSeats = ({ navigation }) => {
    const buses = useSelector(state => state.buses);
    const dispatch = useDispatch();

    const handleClick = (bus) => {
        const formF = {
            ...bus,
            vacantSeats: bus.vacantSeats - 1,
            type: 'BUS_INFO'
        }
        return fetch(baseUrl + 'api/data/edit/' + bus._id, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(formF)
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.log(data.msg)
                }
                else {
                    dispatch({
                        type: 'EDIT_BUS',
                        payload: data.result
                    })
                    Alert.alert('Thank you', 'Have a nice ride');
                    navigation.navigate('AccountInfo');
                    console.log('Bus Info Updated');
                }
            })
            .catch(err => console.log(err.message));
    }

    return (
        <>
            {
                buses.isLoading ? (
                    <>
                        <View style={{ ...globalStyles.container, alignItems: 'center', justifyContent: 'center' }}>
                            <Text>Loading..</Text>
                        </View>
                    </>
                ) : (
                    <View style={{ ...globalStyles.container }}>
                        {
                            buses.isClicked ? (
                                <Text style={{ fontFamily: 'Nunito-Regular', fontSize: 18, marginTop: 10, textAlign: 'center', marginBottom: 25 }}>You have already choosen a ride</Text>
                            ) : (
                                <Text style={{ fontFamily: 'Nunito-Regular', fontSize: 18, marginTop: 10, textAlign: 'center', marginBottom: 25 }}>Choose a bus to travel from</Text>
                            )
                        }

                        {
                            buses.buses.map(bus => (
                                <Pressable key={bus._id} onPress={() => { handleClick(bus) }} disabled={buses.isClicked}>
                                    <ListItem key={bus._id} bottomDivider >
                                        <Image
                                            source={{ uri: bus.image }}
                                            style={{ width: 150, height: 120 }}
                                        />
                                        <ListItem.Content>
                                            <ListItem.Title>{bus.name}</ListItem.Title>
                                            <ListItem.Subtitle>{bus.busBranch}</ListItem.Subtitle>
                                            <ListItem.Subtitle>{`Vacant Seats: ${bus.vacantSeats}`}</ListItem.Subtitle>
                                        </ListItem.Content>
                                    </ListItem>
                                </Pressable>

                            ))
                        }
                    </View>
                )
            }
        </>

    )
}

export default VacancyOfSeats
