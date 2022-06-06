import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const MemberBalanceHistory = ({navigation, route}) => {
  const {users, meals, balancehistory} = route.params;

  const [thisMonth, setThisMonth] = useState(true);
  const [total, setTotal] = useState(0);

  const calculateTotal = () => {
    let carryTotal = 0;
    if (thisMonth) {
      meals.forEach(element => {
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
    } else {
      meals.forEach(element => {
        if (element?.dinner) {
          carryTotal = carryTotal + element.dinner;
        }
        if (element?.lunch) {
          carryTotal = carryTotal + element.lunch;
        }
      });
    }
    setTotal(carryTotal);
  };

  useEffect(() => {
    calculateTotal();
  }, [thisMonth]);

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
        <View style={{flexDirection: 'row'}}>
          <CheckBox
            value={thisMonth}
            onValueChange={() => setThisMonth(!thisMonth)}
          />
          <Text style={{padding: 5}}>This Month Only</Text>
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
                fontSize: 16,
                fontWeight: 'bold',
                color: '#fff',
              }}>
              Date
            </Text>
            <Text
              style={{
                ...styles.mealfield,
                fontSize: 16,
                fontWeight: 'bold',
                color: '#fff',
              }}>
              Amount
            </Text>
            <Text
              style={{
                ...styles.mealfield,
                fontSize: 16,
                fontWeight: 'bold',
                color: '#fff',
              }}>
              C/A
            </Text>
            <Text
              style={{
                ...styles.mealcomment,
                fontSize: 16,
                fontWeight: 'bold',
                color: '#fff',
              }}>
              Comment
            </Text>
          </View>
          {!thisMonth && (
            <View style={styles.mealList}>
              <Text style={styles.mealdate}></Text>
              <Text style={styles.mealfield}></Text>
              <Text style={styles.mealfield}>0</Text>
              <Text style={styles.mealcomment}>balance</Text>
            </View>
          )}
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{height: windowHeight * 0.3}}>
            {thisMonth
              ? balancehistory.map(itm => {
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

                        {itm?.details == 'payment' ? (
                          <Text style={{...styles.mealfield, color: '#0CCBE5'}}>
                            {itm?.amount}
                          </Text>
                        ) : (
                          <Text style={{...styles.mealfield, color: '#FF6347'}}>
                            {itm?.amount}
                          </Text>
                        )}
                        <Text style={styles.mealfield}>
                          {itm?.current_amount}
                        </Text>
                        <Text style={styles.mealcomment}>{itm?.details}</Text>
                      </View>
                    );
                  }
                })
              : balancehistory.map(itm => {
                  let date = new Date(itm?.created_at);
                  return (
                    <View style={styles.mealList} key={itm?.id}>
                      <Text style={styles.mealdate}>{`${date.getDate()}-${
                        date.getMonth() + 1
                      }-${date.getFullYear()}`}</Text>

                      {itm?.details == 'payment' ? (
                        <Text style={{...styles.mealfield, color: '#0CCBE5'}}>
                          {itm?.amount}
                        </Text>
                      ) : (
                        <Text style={{...styles.mealfield, color: '#FF6347'}}>
                          {itm?.amount}
                        </Text>
                      )}
                      <Text style={styles.mealfield}>
                        {itm?.current_amount}
                      </Text>
                      <Text style={styles.mealcomment}>{itm?.details}</Text>
                    </View>
                  );
                })}
          </ScrollView>
          <View>
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
    width: windowWidth * 0.22,
    textAlign: 'center',
  },
  mealfield: {
    width: windowWidth * 0.15,
    textAlign: 'center',
  },
  mealcomment: {
    width: windowWidth * 0.25,
    textAlign: 'center',
  },
  btn: {
    padding: 5,
    textAlign: 'center',
    borderRadius: 20,
    backgroundColor: '#0CCBE5',
    margin: 5,
    marginTop: 30,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MemberBalanceHistory;
