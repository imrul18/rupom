import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const PaymentDetails = ({navigation}) => {
  let {userData, userMeal, userPayment} = useSelector(
    state => state.usersStore,
  );

  const [total, setTotal] = useState(0);

  const users = userData[0];
  const payment = userPayment;

  const calculateTotal = () => {
    let carryTotal = 0;
    userMeal.forEach(element => {
      if (new Date().getMonth() + 1 === new Date(element.date).getMonth() + 1) {
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
          <View
            style={{
              ...styles.mealList,
              paddingVertical: 10,
              backgroundColor: '#bfbfbf',
            }}>
            <Text
              style={{
                ...styles.mealdate,
                fontSize: 18,
                fontWeight: 'bold',
                color: '#fff',
              }}>
              Date
            </Text>
            <Text
              style={{
                ...styles.mealfield,
                fontSize: 18,
                fontWeight: 'bold',
                color: '#fff',
              }}>
              Amount
            </Text>
            <Text
              style={{
                ...styles.mealcomment,
                fontSize: 18,
                fontWeight: 'bold',
                color: '#fff',
              }}>
              Comment
            </Text>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{height: windowHeight * 0.45}}>
            {payment.map(itm => {
              let date = new Date(itm?.date);
              return (
                <View style={styles.mealList}>
                  <Text style={styles.mealdate}>{`${date.getDate()}-${
                    date.getMonth() + 1
                  }-${date.getFullYear()}`}</Text>
                  {itm?.amount < 0 ? (
                    <Text style={{...styles.mealfield, color: 'red'}}>
                      {itm?.amount}
                    </Text>
                  ) : (
                    <Text style={styles.mealfield}>{itm?.amount}</Text>
                  )}
                  <Text style={styles.mealfield}>{itm?.comment}</Text>
                </View>
              );
            })}
          </ScrollView>
          <View>
            <Text
              style={styles.btn}
              onPress={() => {
                navigation.navigate('dashboard');
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
    width: windowWidth * 0.8,
    marginTop: 20,
  },
  mealList: {
    flexDirection: 'row',
    margin: 1,
    padding: 2,
    backgroundColor: '#dfdfdf',
    borderRadius: 5,
  },
  mealdate: {
    width: windowWidth * 0.25,
    textAlign: 'center',
  },
  mealfield: {
    width: windowWidth * 0.2,
    textAlign: 'center',
  },
  mealcomment: {
    width: windowWidth * 0.35,
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

export default PaymentDetails;
