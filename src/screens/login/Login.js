import { View, Alert, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './loginStyle'
import NavigationStrings from '../../constants/NavigationStrings';
import auth from '@react-native-firebase/auth';
import { firebase } from '../Home/firbase'
// import { collection, doc, setDoc } from "firebase/firestore";
// import firestore from '@react-native-firebase/firestore';

export default function Login({ navigation }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onFooterLinkPress = () => {
        navigation.navigate('RegistrationScreen')
    }


    const onLoginPress = () => {
        if (email === '') {
            Alert.alert('Enter details to Email!')
        }
        if (password === '') {
            Alert.alert('Enter details to Password!')
        } else {
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then((response) => {
                    const uid = response.user.uid
                    navigation.navigate('TestHooks', { user: uid })
                        
                })
                .catch(error => {
                    alert(error)
                })
        }
    }

    const renderLoginView = () => {

        return (
            <View style={styles.container}>
                <View
                    style={{ flex: 1, width: '100%', marginTop: 50, }}>
                    <TextInput
                        style={styles.input}
                        placeholder='E-mail'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        secureTextEntry
                        placeholder='Password'
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => onLoginPress()}>
                        <Text style={styles.buttonTitle}>Log in</Text>
                    </TouchableOpacity>
                    <View style={styles.footerView}>
                        <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
                    </View>
                </View>
            </View>
        )
    }


    return (
        <View style={styles.container}>
            {renderLoginView()}
        </View>
    )
}