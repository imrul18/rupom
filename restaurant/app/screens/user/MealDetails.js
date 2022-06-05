import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import UserService from '../../services/UserService';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const MealDetails = ({navigation, route}) => {
  const username =route.params.username
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
    userMeal?.forEach(element => {
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
    if (userMeal) {
      calculateTotal();
    }
  }, [userMeal]);

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
              Lunch
            </Text>
            <Text
              style={{
                ...styles.mealfield,
                fontSize: 18,
                fontWeight: 'bold',
                color: '#fff',
              }}>
              Dinner
            </Text>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{height: windowHeight * 0.45}}>
            {userMeal?.map(itm => {
              let date = new Date(itm?.created_at);
              
              if (
                new Date().getMonth() + 1 ===
                new Date(itm?.created_at).getMonth() + 1
              ) {
                return (
                  <View style={styles.mealList} key={itm?.id}>
                    <Text style={styles.mealdate}>{`${date.getDate()}-${
                      date.getMonth() + 1
                    }-${date.getFullYear()}`}</Text>
                    <Text style={styles.mealfield}>{itm?.lunch}</Text>
                    <Text style={styles.mealfield}>{itm?.dinner}</Text>
                  </View>
                );
              }
            })}
          </ScrollView>
          <View>
            <Text
              style={styles.btn}
              onPress={() => {
                navigation.navigate('dashboard', {username: username});
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
    width: windowWidth * 0.3,
    textAlign: 'center',
  },
  mealfield: {
    width: windowWidth * 0.25,
    textAlign: 'center',
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

export default MealDetails;