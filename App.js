
import { View, Text, StyleSheet } from 'react-native';
import Routes from './src/Navigation/Routes';
import TestHooks from './src/screens/Test/TestHooks';
import React, { useEffect, useState } from 'react'
// import { firebase } from './src/screens/Home/firbase'

const MyComponent = () => {

  return (
    <View style={{ flex: 1 }}>
      <Routes />
    </View>
  );
};


export default MyComponent;
