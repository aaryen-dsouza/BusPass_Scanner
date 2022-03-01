import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import globalStyles from '../styles/globalStyles';
import { Overlay } from 'react-native-elements'

const QrScanner = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [result, setResult] = useState({});
    const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })()
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        const dataF = JSON.parse(data);
        setResult(dataF);
        setVisible(true);
        console.log('Code scanned.')
        console.log('Type: ' + type + '\nData: ' + data);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return (
            <View >
                <Text style={{ margin: 10 }}>No access to camera</Text>
                <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
            </View>
        )
    }
    return (
        <>
            <View style={{ ...globalStyles.container }}>
                <Text style={{ textAlign: 'center', fontFamily: 'Nunito-Bold', fontSize: 20, marginTop: 75 }}> Scan the student's QR Code</Text>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
            </View>
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                <View style={{ display: 'flex', padding: 10, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontFamily: 'Nunito-Regular', fontSize: 20, marginBottom: 20 }}>{`Name : ${result.name}`}</Text>
                    <Text style={{ fontFamily: 'Nunito-Regular', fontSize: 20, marginBottom: 20 }}>{`Branch : ${result.branch}`}</Text>
                    <Text style={{ fontFamily: 'Nunito-Regular', fontSize: 20, marginBottom: 20 }}>{`Bus Branch : ${result.busBranch}`}</Text>
                    {
                        result.qrValid ? (
                            <Text style={{ fontSize: 22, fontFamily: 'Nunito-Regular', marginBottom: 25 }}>{`Qr Validity: Valid`}</Text>

                        ) : (
                            <Text style={{ fontSize: 22, fontFamily: 'Nunito-Regular', marginBottom: 25 }}>{`Qr Validity: Invalid`}</Text>

                        )
                    }
                    {
                        scanned && <Button title={'Tap to scan again'} onPress={() => { setScanned(false); setVisible(false) }} color='#000' />
                    }
                </View>
            </Overlay>
        </>
    )
}

export default QrScanner;
