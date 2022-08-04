//import liraries
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from './SignUpStyle';
import React, { useEffect, useState } from 'react'
// import firestore from '@react-native-firebase/firestore';

// import auth from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
// // import { initializeApp, firebase } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

import { firebase } from '../Home/firbase'

export default function RegistrationScreen({ navigation }) {

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const onFooterLinkPress = () => {
    navigation.navigate('Login')
  }
  useEffect(() => {
    console.log("@@@ This is login =====")
  }, [])
  const onRegisterPress = () => {
    if (email === '') {
      Alert.alert('Enter details to Email!')
    }
    if (password === '') {
      Alert.alert('Enter details to Password!')
    } else {
      firebase.
        auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
          const uid = response.user.uid
          const data = {
            id: uid,
            email,
            fullName,
          };
          const usersRef = firebase.firestore().collection('users')
          usersRef
            .doc(uid)
            .set(data)
            .then(() => {
              navigation.navigate('TestHooks', { user: data })
            })
            .catch((error) => {
              alert(error)
            });
        })

        .catch(error => {
          alert(error)
        })
    }
  }



  const renderSignUpView = () => {
    return (
      <View style={styles.container}>
        <View
          style={{ flex: 1, width: '100%' }}>

          <TextInput
            style={styles.input}
            placeholder='Full Name'
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setFullName(text)}
            value={fullName}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
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
          <TextInput
            style={styles.input}
            placeholderTextColor="#aaaaaa"
            secureTextEntry
            placeholder='Confirm Password'
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => onRegisterPress()}>
            <Text style={styles.buttonTitle}>Create account</Text>
          </TouchableOpacity>
          <View style={styles.footerView}>
            <Text style={styles.footerText}>Already got an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
          </View>
        </View>
      </View>
    )
  }


  return (
    <View style={styles.container}>
      {renderSignUpView()}
    </View>
  )
}

// export default MyComponent;
