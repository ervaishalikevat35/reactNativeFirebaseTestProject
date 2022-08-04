//import liraries
import React, { useEffect,useState } from 'react'
import { View, Text, Button,} from 'react-native';
import NavigationStrings from '../../constants/NavigationStrings';
import styles from './HomeStyle';

// create a component
const Home = ({ navigation }) => {
    return (

        <View style={styles.container}>
            <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#fff' }}>Welcome</Text>
            <Button onPress={() => navigation.navigate(NavigationStrings.LOGIN)}
                title='for login click me' />
        </View>

    );
};

export default Home;
