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
import AddMeal from '../add_meal/AddMeal';

const windowWidth = Dimensions.get('window').width;

const AddPayments = ({navigation}) => {
  const [text, setText] = useState();
  const [loading, setLoading] = useState(false);

  const addPayment = async username => {
    setLoading(true);
    try {
      const res1 = await UserService.getuserdata(username);
      const res2 = await UserService.getmealdata(username);
      
      setLoading(false);
      navigation.navigate('make_payment', {
        userData: res1.data[0],    
        userMeal: res2.data  
      });
    } catch (error) {
      setLoading(false);
    }
  };
  const onSuccess = async res => {
    let value = res.data.toString();
    addPayment(value);
  };

  const manualAdd = async () => {
    addPayment(text);
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
