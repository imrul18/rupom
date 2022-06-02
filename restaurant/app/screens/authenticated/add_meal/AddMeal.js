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
import MealService from '../../../services/MealService';

const windowWidth = Dimensions.get('window').width;

const AddMeal = () => {
  const [text, setText] = useState();
  const [loading, setLoading] = useState(false);

  const onSuccess = async res => {
    setLoading(true);
    let value = res.data.toString();
    const date = new Date();

    let type = {
      user_id: value,
      datetime: `${date.getDate()}-${
        date.getMonth() + 1
      }-${date.getFullYear()}`,
    };

    let data;

    if (date.getHours() > 10 && date.getHours() < 18) {
      data = {...type, lunch: '1'};
    } else if (date.getHours() > 17 && date.getHours() < 24) {
      data = {...type, dinner: '1'};
    } else {
      data = {...type, breakfast: '1'};
    }
    if (value && data) {
      try {
        await MealService.addbyqrcode(data);
        setLoading(false);
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
    const date = new Date();

    let type = {
      username: text,
      datetime: `${date.getDate()}-${
        date.getMonth() + 1
      }-${date.getFullYear()}`,
    };

    let data;

    if (date.getHours() > 10 && date.getHours() < 18) {
      data = {...type, lunch: '1'};
    } else if (date.getHours() > 17 && date.getHours() < 24) {
      data = {...type, dinner: '1'};
    } else {
      data = {...type, breakfast: '1'};
    }

    if (data) {
      try {
        await MealService.addbyqrusername(data);
        setLoading(false);
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

  return (
    <View style={styles.container}>
      <View style={styles.logincontainer}>
        <Text style={styles.btn}>Scan for Adding Meal</Text>
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
          <Text style={{...styles.btn}}>Add Meal</Text>
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

export default AddMeal;
