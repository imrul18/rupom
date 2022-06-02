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
import { useDispatch } from 'react-redux';
import { setUsers } from '../../ReduxStore/UsersStore';
import UserService from '../../services/UserService';

const windowWidth = Dimensions.get('window').width;

const Auth = ({navigation}) => {
  const dispatch = useDispatch();
  const [text, setText] = useState();
  const [loading, setLoading] = useState(false);

  const onSuccess = async res => {
    setLoading(true);
    let data = res.data.toString();
    if (data) {
      try {
        const res = await UserService.getbyid(data);
        setLoading(false);
        dispatch(setUsers(res.data))
        navigation.navigate('dashboard');
      } catch (error) {
        setLoading(false);
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Invalid QR code',
        text2: 'Please scan a valid QR code...',
        position: 'top',
      });
    }
  };
  const manualShow = async() => {
    if (text) {
      try {
        const res = await UserService.getbyusername(text);
        setLoading(false);
        dispatch(setUsers(res.data))
        navigation.navigate('dashboard');
      } catch (error) {
        setLoading(false);
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Invalid Username',
        text2: 'Please insert a valid username...',
        position: 'top',
      });
    }
  };
  const loginpage = ()=> {
    navigation.navigate('login');
  };
  return (
    <View style={styles.container}>
      <View style={styles.qrcontainer}>
        <QRCodeScanner
          onRead={onSuccess}
          cameraStyle={styles.qrscanner}
          reactivate={true}
          reactivateTimeout={3000}
        />
      </View>
      <View style={styles.manualcontainer}>
        <TextInput
          style={styles.text}
          onChangeText={setText}
          placeholder="Your userID..."
        />
        <TouchableOpacity onPress={manualShow}>
          <Text style={{...styles.btn, width: 100}}>Show</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.logincontainer}>
        <TouchableOpacity onPress={loginpage}>
          <Text style={styles.btn}>Go to Login Page</Text>
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
    width: windowWidth*0.6,
    textAlign: 'center',
    fontSize: 20,
    borderRadius: 50,
    backgroundColor: '#0CCBE5',
    color: '#fff',
  },
  logincontainer: {
    marginTop: windowWidth * 0.2,
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

export default Auth;
