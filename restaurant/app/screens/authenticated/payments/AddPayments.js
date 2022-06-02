import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Modal,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Toast from 'react-native-toast-message';
import UserService from '../../../services/UserService';

const windowWidth = Dimensions.get('window').width;

const AddPayments = ({navigation}) => {
  const [text, setText] = useState();
  const [loading, setLoading] = useState(false);

  const onSuccess = async res => {
    setLoading(true);
    let value = res.data.toString();

    if (value) {
      try {
        const data = await UserService.getbyid(value);
        setLoading(false);
        navigation.navigate('make_payment', {
          userData: data.data.userData[0],
          userMeal: data.data.meals,
        });
      } catch (error) {
        setLoading(false);
      }
    } else {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Invalid QR code',
        text2: 'Please scan a valid QR code...',
        position: 'top',
      });
    }
  };

  const manualAdd = async () => {
    setLoading(true);
    if (text) {
      try {
        const data = await UserService.getbyusername(text);
        setLoading(false)
        navigation.navigate('make_payment', {
          userData: data.data.userData[0],
          userMeal: data.data.meals,
        });
      } catch (error) {
        setLoading(false);
      }
    } else {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Invalid Username',
        text2: 'Please give a valid username...',
        position: 'top',
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logincontainer}>
        <Text style={styles.btn}>Scan for Payment</Text>
      </View>
      <View style={styles.qrcontainer}>
        <QRCodeScanner
          onRead={onSuccess}
          cameraStyle={styles.qrscanner}
          reactivate={true}
          reactivateTimeout={2000}
        />
      </View>
      <View style={styles.manualcontainer}>
        <TextInput
          style={styles.text}
          onChangeText={setText}
          placeholder="Your userID..."
        />
        <TouchableOpacity onPress={manualAdd}>
          <Text style={{...styles.btn}}>Make Payment</Text>
        </TouchableOpacity>
      </View>

      <Modal animationType="slide" transparent={true} visible={loading}>
        <View style={styles.loginModalVIew}>
          <ActivityIndicator size="large" color="red" />
          <Text>Please Wait...</Text>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  qrcontainer: {},
  qrscanner: {
    margin: windowWidth * 0.25,
    width: windowWidth * 0.5,
    marginTop: windowWidth * 0.05,
  },
  manualcontainer: {
    marginTop: windowWidth * 1.1,
    alignItems: 'center',
  },
  text: {
    borderWidth: 1,
    width: windowWidth * 0.6,
    borderRadius: 10,
    textAlign: 'center',
  },
  btn: {
    margin: 10,
    padding: 10,
    width: windowWidth * 0.6,
    textAlign: 'center',
    fontSize: 20,
    borderRadius: 50,
    backgroundColor: '#0CCBE5',
    color: '#fff',
  },
  logincontainer: {
    alignItems: 'center',
  },
  loginpage: {
    fontSize: 20,
    color: '#0044cc',
  },

  loginModalVIew: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginHorizontal: 100,
    marginVertical: 300,
    borderRadius: 20,
  },
});

export default AddPayments;
