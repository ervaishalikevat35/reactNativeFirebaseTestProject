
import React, { useEffect, useState } from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigationStrings from '../constants/NavigationStrings';
// import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { firebase } from '../screens/Home/firbase'
import { LogBox } from 'react-native';
import SplashScreen from '../screens/Home/SplashScreen'

LogBox.ignoreLogs(['Warning: Async Storage has been extracted from react-native core']);

import {
    Home,
    RegistrationScreen,
    Login,
    Profile,
    TestHooks
} from '../screens';

const Stack = createNativeStackNavigator();

function Routes() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const usersRef = firebase.firestore().collection('users');
        firebase.auth().onAuthStateChanged(user => {
            console.log("user@@", user)
            if (user) {
                setUser(usersRef)
            }
        });
    }, []);

    console.log("user@@325", user)

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='SplashScreen'>
                        <Stack.Screen name={NavigationStrings.HOME} component={Home} />
                        <Stack.Screen name={NavigationStrings.LOGIN} component={Login} />
                        <Stack.Screen name={NavigationStrings.RegistrationScreen} component={RegistrationScreen} />
                        <Stack.Screen name={NavigationStrings.TESTHOOKS} component={TestHooks} />
            
                        <Stack.Screen name={NavigationStrings.SplashScreen} component={SplashScreen} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;