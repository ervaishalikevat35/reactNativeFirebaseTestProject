//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from './ProfileStyle';



const Profile = ({navigation, route}) => {
    const {Name} = route.params
    console.log("@@@paramsAdat", Name)
    return (
        <View style={styles.container}>
            <Text>Profile</Text>
            <Text>{Name}</Text>
        </View>
    );
};

export default Profile;
