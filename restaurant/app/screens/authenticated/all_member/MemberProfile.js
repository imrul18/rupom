import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Linking,
  Modal,
  ActivityIndicator,
  PermissionsAndroid,
} from 'react-native';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {openComposer} from 'react-native-email-link';

import RNHTMLtoPDF from 'react-native-html-to-pdf';
import QRCode from 'react-native-qrcode-svg';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UserService from '../../../services/UserService';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const MemberProfile = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);

  const [users, setUsers] = useState();
  const [meals, setMeals] = useState();
  const [payments, setPayments] = useState();
  const [balanceHistory, setBalanceHistory] = useState();

  const getData = async () => {
    setLoading(true);
    var res = await UserService.getuserdata(route.params.username);
    setUsers(res.data[0]);
    res = await UserService.getmealdata(route.params.username);
    setMeals(res.data);
    res = await UserService.getpaymentdata(route.params.username);
    setPayments(res.data);
    res = await UserService.getbalancedata(route.params.username);
    setBalanceHistory(res.data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const [total, setTotal] = useState(0);

  const calculateTotal = () => {
    let carryTotal = 0;
    meals?.forEach(element => {
      if (
        new Date().getMonth() + 1 ===
        new Date(element.created_at).getMonth() + 1
      ) {
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
  }, [meals]);

  const sendmail = () => {
    openComposer({
      to: users?.email,
      subject: 'About Govt. BM College Canteen Issue',
      body: 'Hi, ...',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.firsthalf}>
        <Image
          style={styles.image}
          source={{
            uri: users?.imagelink,
          }}
        />
        <Text style={styles.text}>{users?.fullname}</Text>
      </View>
      <View style={styles.secondhalf}>
        <View style={styles.information}>
          <View style={styles.informationfield}>
            <View style={styles.field}>
              <Text style={styles.fieldname}>Total Balance</Text>
              <Text style={styles.fieldvalue}>{users?.balance}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.fieldname}>Total Meal</Text>
              <Text style={styles.fieldvalue}>{total}</Text>
            </View>
          </View>
        </View>
        <View style={styles.details}>
          <View style={styles.detailsinfo}>
            <Ionicons
              name="mail"
              size={28}
              color="#0CCBE5"
              onPress={sendmail}
            />
            <Text style={{padding: 5, paddingLeft: 20}}>{users?.email}</Text>
          </View>
          <View style={styles.detailsinfo}>
            <Ionicons
              name="call"
              size={28}
              color="#0CCBE5"
              onPress={() => {
                Linking.openURL(`tel:${users?.phone}`);
              }}
            />
            <Text style={{padding: 5, paddingLeft: 20}}>{users?.phone}</Text>
          </View>
          <View style={styles.detailsinfo}>
            <MaterialCommunityIcons
              name="account-details"
              size={28}
              color="#0CCBE5"
            />
            <Text style={{padding: 5, paddingLeft: 20}}>{users?.details}</Text>
          </View>
          <View>
            <Text
              style={{...styles.btn, marginTop: 10}}
              onPress={() => {
                navigation.navigate('member_meal_details', {
                  users: users,
                  meals: meals,
                });
              }}>
              See Meal Details...
            </Text>
            <Text
              style={styles.btn}
              onPress={() => {
                navigation.navigate('member_payment_details', {
                  users: users,
                  meals: meals,
                  payment: payments,
                });
              }}>
              See Payment Details...
            </Text>
            <Text
              style={styles.btn}
              onPress={() => {
                navigation.navigate('member_balance_history', {
                  users: users,
                  meals: meals,
                  balancehistory: balanceHistory,
                });
              }}>
              Balance History...
            </Text>
            <Text style={styles.btn} onPress={() => {
                navigation.navigate('member_ID_card', {
                  users: users,
                });
              }}>
              Download ID card...
            </Text>
            <Text
              style={styles.btn}
              onPress={() => {
                navigation.goBack();
              }}>
              Back
            </Text>
          </View>
        </View>
      </View>
      <Modal animationType="slide" transparent={true} visible={loading}>
        <View style={styles.loginModalView}>
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
    marginTop: 10,
  },
  detailsinfo: {
    flexDirection: 'row',
    textAlign: 'center',
    paddingVertical: 10,
  },
  btn: {
    padding: 5,
    textAlign: 'center',
    borderRadius: 20,
    backgroundColor: '#0CCBE5',
    margin: 5,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginModalView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginHorizontal: 100,
    marginVertical: 300,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#7f7f7f',
  },
});

export default MemberProfile;
