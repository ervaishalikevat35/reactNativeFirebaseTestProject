import { StyleSheet, Text, View, TouchableOpacity, FlatList, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import styles from './TestHookStyle'
import { SafeAreaView } from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '../Home/firbase'
import auth from '@react-native-firebase/auth';

export default function TestHooks({ navigation, props }) {


    const [entityText, setEntityText] = useState('')
    const [entities, setEntities] = useState([])
    const entityRef = firestore().collection('users')

    useEffect(() => {
        entityRef
            .onSnapshot(
                querySnapshot => {
                    const newEntities = []
                    querySnapshot.forEach(doc => {
                        const entity = doc.data()
                        entity.id = doc.id
                        newEntities.push(entity)
                    });
                    console.log("newEntities", newEntities)
                    setEntities(newEntities)
                },
                error => {
                    console.log(error)
                }
            )
    }, [])

    const userLogout = () => {
        firebase.
            auth()
            .signOut()
            .then(() =>
                navigation.replace('Login')


            );
    }


    const renderEntity = ({ item, index }) => {
        return (
            <View style={styles.entityContainer}>
                <Text style={styles.entityText}>
                    {item.text}
                </Text>
                {item.text ?
                    <TouchableOpacity onPress={() => dbRefDelete(item)}>
                        <Text style={styles.deleteText}>
                            Delete
                        </Text>
                    </TouchableOpacity>
                    : null

                }
            </View>
        )
    }
    const dbRefDelete = (item) => {
        console.log("index", item.id)
        const dbRef = firestore().collection('users').doc(item.id)
        dbRef.delete().then((res) => {
            console.log('Item removed from database', res)
            // this.props.navigation.navigate('UserScreen');
        })
    }

    const onAddButtonPress = () => {
        firestore().collection('users').add({
            text: entityText,
            age: 30
        })
    }
    return (
        <>
            <TouchableOpacity onPress={() => userLogout()}>
                <Text style={styles.logoutText}>
                    LOGOUT
                </Text>
            </TouchableOpacity>
            <View style={styles.container}>

                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder='Add new entity'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setEntityText(text)}
                        value={entityText}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    {/* <Button title="logout" onPress={() =>signOutUser()} /> */}

                    <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
                        <Text style={styles.buttonText}>Add</Text>
                    </TouchableOpacity>

                </View>
                {entities && (
                    <View style={styles.listContainer}>
                        <FlatList
                            data={entities}
                            renderItem={renderEntity}
                            keyExtractor={(item) => item.id}
                            removeClippedSubviews={true}
                        />
                    </View>
                )}

            </View>
        </>

    )
}

