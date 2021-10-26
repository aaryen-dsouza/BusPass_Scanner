import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import globalStyles from '../styles/globalStyles';

const Role = ({ navigation }) => {
    return (
        <View style={{ ...globalStyles.container, alignItems: 'center' }}>

            <Text style={{ fontFamily: 'Nunito-Regular', fontSize: 24, marginTop: 190, marginBottom: 40, borderBottomWidth: 1, borderBottomColor: '#000' }}>Select your role</Text>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Login', { type: 'Student' })}>
                <Text style={styles.roleText}>Student</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Login', { type: 'Bus faculty' })}>
                <Text style={{ ...styles.roleText, paddingHorizontal: 80 }}>Bus Faculty</Text>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default Role;


const styles = StyleSheet.create({
    roleText: {
        fontFamily: 'Nunito-Regular',
        fontSize: 22,
        elevation: 1,
        borderColor: '#000',
        paddingHorizontal: 100,
        paddingVertical: 10,
        marginBottom: 35
    }
});
