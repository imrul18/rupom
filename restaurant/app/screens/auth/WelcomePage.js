import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';

const WelcomePage = ({navigation}) => {

  const Auth = async () => {
    var carry = await AsyncStorage.getItem('user');
    carry = JSON.parse(carry);
    if (carry?.access_token) {
      navigation.navigate('authenticated');
    } else {
      navigation.navigate('qrshow');
    }
  };
  useEffect(() => {
    Auth();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default WelcomePage;
