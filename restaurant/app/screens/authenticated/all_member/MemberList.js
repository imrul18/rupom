import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  Modal,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import memberService from '../../../services/MemberService';
import {useIsFocused} from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MemberList = ({navigation}) => {
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [due, setDue] = useState(false);
  const [emergency, setEmergency] = useState(false);
  const [emergency_amount, setEmergency_amount] = useState('500');

  const [search, setSearch] = useState('');

  const [member, setMember] = useState([]);
  const [filteredmember, setFilteredMember] = useState([]);

  const getMember = async () => {
    setLoading(true);
    let res = await memberService.getAll();
    setMember(res.data);
    setFilteredMember(res.data);
    setLoading(false);
  };

  const filter = () => {
    let data = member;
    if (due) {
      data = data?.filter(item => item?.balance < 0);
      if (emergency) {
        data = data?.filter(item => item?.balance < -emergency_amount + 1);
      }
    }
    if (search.length) {
      data = data?.filter(item =>
        item?.fullname.toLowerCase().includes(search.toLowerCase()),
      );
    }
    setFilteredMember(data);
  };

  useEffect(() => {
    filter();
  }, [due, emergency, emergency_amount, search, member]);

  useEffect(() => {
    if (isFocused) {
      getMember();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.stylebox}>
        <CheckBox value={due} onValueChange={() => setDue(!due)} />
        <Text style={styles.txt}>due</Text>
        {due && (
          <>
            <CheckBox
              value={emergency}
              onValueChange={() => setEmergency(!emergency)}
            />
            <Text style={styles.txt}>emergency</Text>
            {emergency && (
              <TextInput
                style={styles.txtinput}
                placeholder="Amount..."
                value={emergency_amount}
                onChangeText={setEmergency_amount}
                keyboardType="numeric"
              />
            )}
          </>
        )}
      </View>
      <View style={styles.searchbox}>
        <TextInput
          onChangeText={setSearch}
          style={styles.searchtext}
          placeholder="Search"
        />
      </View>
      <View style={styles.details}>
        <View
          style={{
            ...styles.mealList,
            paddingVertical: 10,
            backgroundColor: '#bfbfbf',
            height: 45,
          }}>
          <Text
            style={{
              ...styles.mealdate,
              fontSize: 18,
              fontWeight: 'bold',
              color: '#fff',
            }}>
            Name
          </Text>
          <Text
            style={{
              ...styles.mealfield,
              fontSize: 18,
              fontWeight: 'bold',
              color: '#fff',
            }}>
            Username
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
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{height: windowHeight * 0.45}}>
          {filteredmember?.map(itm => {
            return (
              <TouchableOpacity
                style={styles.mealList}
                key={itm?.id}
                onPress={() => {
                  navigation.navigate('member_profile', {
                    username: itm?.username,
                  });
                }}>
                <Text style={styles.mealdate}>{itm?.fullname}</Text>
                <Text style={styles.mealfield}>{itm?.username}</Text>
                <Text style={styles.mealfield}>{itm?.balance}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
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
    backgroundColor: '#efefef',
    alignItems: 'center',
  },
  stylebox: {
    padding: 20,
    flexDirection: 'row',
    height: 70,
  },
  txt: {
    paddingTop: 5,
    paddingRight: 8,
  },
  txtinput: {
    marginLeft: 10,
    borderWidth: 1,
    height: 35,
    width: 80,
    textAlign: 'center',
    borderRadius: 10,
    paddingVertical: 2,
  },
  searchbox: {
    alignItems: 'center',
  },
  searchtext: {
    borderRadius: 20,
    height: 40,
    width: 200,
    borderWidth: 2,
    textAlign: 'center',
  },
  details: {
    width: windowWidth,
    marginTop: 20,
  },
  mealList: {
    flexDirection: 'row',
    margin: 5,
    padding: 2,
    backgroundColor: '#dfdfdf',
    borderRadius: 5,
    height: 30,
  },
  mealdate: {
    width: windowWidth * 0.35,
    textAlign: 'center',
  },
  mealfield: {
    width: windowWidth * 0.3,
    textAlign: 'center',
    paddingHorizontal: 5,
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
export default MemberList;
