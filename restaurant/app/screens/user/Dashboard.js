import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Image, Linking} from 'react-native';
import {useSelector} from 'react-redux';
import {openComposer} from 'react-native-email-link';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UserService from '../../services/UserService';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const Dashboard = ({navigation, route}) => {
  const username = route.params.username;
  const [userData, setUserData] = useState();
  const [userMeal, setUserMeal] = useState();

  const getData = async () => {
    var res = await UserService.getuserdata(username);
    setUserData(res.data[0]);
    res = await UserService.getmealdata(username);
    setUserMeal(res.data);
  };
  useEffect(() => {
    getData();
  }, []);

  const [total, setTotal] = useState(0);
  const calculateTotal = () => {
    let carryTotal = 0;
    userMeal.forEach(element => {
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
    if (userMeal) {
      calculateTotal();
    }
  }, [userMeal]);

  const sendmail = () => {
    openComposer({
      to: userData?.email,
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
          <View style={styles.detailsinfo}>
            <Ionicons
              name="mail"
              size={28}
              color="#0CCBE5"
              onPress={sendmail}
            />
            <Text style={{padding: 5, paddingLeft: 20}}>{userData?.email}</Text>
          </View>
          <View style={styles.detailsinfo}>
            <Ionicons
              name="call"
              size={28}
              color="#0CCBE5"
              onPress={() => {
                Linking.openURL(`tel:${userData?.phone}`);
              }}
            />
            <Text style={{padding: 5, paddingLeft: 20}}>{userData?.phone}</Text>
          </View>
          <View style={styles.detailsinfo}>
            <MaterialCommunityIcons
              name="account-details"
              size={28}
              color="#0CCBE5"
            />
            <Text style={{padding: 5, paddingLeft: 20}}>
              {userData?.details}
            </Text>
          </View>
          <View>
            <Text
              style={{...styles.btn, marginTop: 50}}
              onPress={() => {
                navigation.navigate('mealdetails', {
                  username: username,
                });
              }}>
              See Meal Details...
            </Text>
            <Text
              style={styles.btn}
              onPress={() => {
                navigation.navigate('paymentdetails', {
                  username: username,
                });
              }}>
              See Payment Details...
            </Text>
            <Text
              style={styles.btn}
              onPress={() => {
                navigation.navigate('qrshow');
              }}>
              Back
            </Text>
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
    marginTop: 40,
  },
  detailsinfo: {
    flexDirection: 'row',
    textAlign: 'center',
    paddingVertical: 10,
  },
  btn: {
    padding: 10,
    textAlign: 'center',
    borderRadius: 20,
    backgroundColor: '#0CCBE5',
    margin: 5,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Dashboard;
