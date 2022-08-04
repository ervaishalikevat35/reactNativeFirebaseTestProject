import React, { useEffect } from 'react';
import { View, Text } from 'react-native'

import auth from '@react-native-firebase/auth';
import { LogBox } from 'react-native';
import { firebase } from '../../screens/Home/firbase'

SplashScreen = (props) => {


    useEffect(() => {
        const usersRef = firebase.firestore().collection('users');
        firebase.auth().onAuthStateChanged(user => {
            console.log("user@@", user)
            if (user) {
                props.navigation.navigate('TestHooks')
            }
            else {
                const timer = setTimeout(() => {
                    props.navigation.navigate('Login')
                }, 5000);
                return () => clearTimeout(timer);
            }
        });

    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'orange', fontWeight: 'bold', fontSize: 36 }}>TEST Project</Text>
        </View>
    )
}


export default SplashScreen