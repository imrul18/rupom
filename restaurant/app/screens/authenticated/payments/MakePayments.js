import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import PaymentService from '../../../services/PaymentService';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const MakePayments = ({navigation, route}) => {
  let {userData, userMeal} = route.params;

  const [total, setTotal] = useState(0);

  const meals = userMeal;

  const calculateTotal = () => {
    let carryTotal = 0;
    meals.forEach(element => {
      if (new Date().getMonth() + 1 === new Date(element.created_at).getMonth() + 1) {
        if (element?.dinner) {
          carryTotal = carryTotal + element.dinner;
        }
        if (element?.lunch) {
          carryTotal = carryTotal + element.lunch;
        }
      }
    });
    setTotal(carryTotal);
  };

  useEffect(() => {
    calculateTotal();
  }, []);

  const [amount, setAmount] = useState(0);
  const [comment, setComment] = useState();

  const makePayment = async () => {
    if (amount) {
      try {
        await PaymentService.addpayment({
          username: userData.username,
          amount: amount,
          comment: comment,
        });
        navigation.navigate('add_payment')
      } catch (error) {
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Invalid Amount',
        text2: 'Please give a valid amount...',
        position: 'top',
      });
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.firsthalf}>
        <Image
          style={styles.image}
          source={{
            uri: userData?.imagelink,
          }}
        />
        <Text style={styles.text}>{userData?.fullname}</Text>
      </View>
      <View style={styles.secondhalf}>
        <View style={styles.information}>
          <View style={styles.informationfield}>
            <View style={styles.field}>
              <Text style={styles.fieldname}>Total Balance</Text>
              <Text style={styles.fieldvalue}>{userData?.balance}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.fieldname}>Total Meal</Text>
              <Text style={styles.fieldvalue}>{total}</Text>
            </View>
          </View>
        </View>
        <View style={styles.details}>
          <View style={styles.manualcontainer}>
            <TextInput
              style={styles.inputtext}
              value={amount}
              onChangeText={setAmount}
              placeholder="Amount..."
              keyboardType="numeric"
            />
            <TextInput
              style={styles.inputtext}
              value={comment}
              onChangeText={setComment}
              placeholder="Comment..."
            />
            <TouchableOpacity onPress={makePayment}>
              <Text style={{...styles.btn}}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  firsthalf: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#0CCBE5',
    height: windowHeight * 0.4,
    width: windowWidth,
  },
  image: {
    height: 120,
    width: 120,
    margin: 5,
    marginTop: 20,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: '#fff',
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  secondhalf: {
    flex: 2,
    alignItems: 'center',
  },
  information: {
    backgroundColor: '#fff',
    height: windowHeight * 0.1,
    width: windowWidth * 0.8,
    marginTop: -windowHeight * 0.06,
    borderRadius: 10,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  informationfield: {
    flexDirection: 'row',
  },
  field: {
    margin: 10,
    marginHorizontal: 30,
    alignItems: 'center',
  },
  fieldvalue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0CCBE5',
  },
  details: {
    width: windowWidth * 0.6,
    marginTop: 80,
  },
  detailsinfo: {
    flexDirection: 'row',
    textAlign: 'center',
    paddingVertical: 10,
  },
  manualcontainer: {
    marginTop: windowWidth * 0.1,
    alignItems: 'center',
  },
  inputtext: {
    borderWidth: 1,
    width: windowWidth * 0.6,
    borderRadius: 10,
    textAlign: 'center',
  },
  btn: {
    padding: 15,
    textAlign: 'center',
    borderRadius: 20,
    backgroundColor: '#0CCBE5',
    margin: 5,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MakePayments;
