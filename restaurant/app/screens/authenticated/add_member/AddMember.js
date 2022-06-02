import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

// import {getEmployees, loadEmployees} from '../../../../../ReduxStore/EmployeeStore';
// import EmployeeService from '../../../../../services/EmployeeService';

// import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import memberService from '../../../services/MemberService';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AddMember = () => {
  const [active, setActive] = useState(true);
  const [due, setDue] = useState(false);
  const [emergency, setEmergency] = useState(false);
  const [emergency_amount, setEmergency_amount] = useState('500');

  const [search, setSearch] = useState('');

  const [member, setMember] = useState();
  const getMember = async () => {
    let res = await memberService.getAll();
    setMember(res);
    setFilteredMember(res);
  };

  const [filteredmember, setFilteredMember] = useState();
  const filter = () => {
    let data = member;
    if (active) {
      data = data.filter(item => item?.status == 'active');
    }
    if (due) {
      data = data.filter(item => item?.balance < 0);
    }
    if (emergency) {
      data = data.filter(item => item?.balance < -emergency_amount + 1);
    }
    if (search.length) {
      data = data.filter(
        item =>
          item.fullname.substr(0, search.length).toLowerCase() ===
          search.toLowerCase(),
      );
    }
    setFilteredMember(data);
  };

  useEffect(() => {
    if (filteredmember) filter();
  }, [active, due, emergency, emergency_amount, search, member]);

  useEffect(() => {
    getMember();
  }, []);

  // const isFocused = useIsFocused();
  // //   const dispatch = useDispatch();

  // //   const {user} = useSelector(state => state.authStore);

  // const [loading, setLoading] = useState(true);
  // const [employeeList, setemployeeList] = useState([]);

  // const [confirmDelete, setConfirmDelete] = useState(false);
  // const [deleteItem, setDeleteItem] = useState();

  // const getEmployees = async params => {
  // setMember(await memberService.getAll());
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   if (isFocused) {
  //     getEmployees();
  //   }
  // }, [isFocused]);

  // var allemployees = employeeList.data;
  // if (search == '') {
  //   allemployees = employeeList.data;
  // } else {
  //   var allemployees = allemployees.filter(data => {
  //     return (
  //       data.name.substr(0, search.length).toLowerCase() ===
  //       search.toLowerCase()
  //     );
  //   });
  // }

  // const deleteEmployee = async id => {
  //   await EmployeeService.remove(id);
  //   getEmployees();
  // };

  // const EmployeeList = ({item}) => {
  //   return (
  //     <View style={styles.listcontainer}>
  //       <Text style={styles.dataname}>{item.name}</Text>

  //       <Text style={styles.datastatus}>
  //         {item.status == 1 ? 'active' : 'disable'}
  //       </Text>
  //       <View style={styles.dataaction}>
  //         {item.name != 'admin' &&
  //           (user?.role === 'Admin' ||
  //             user?.permissions.includes('employees_show')) && (
  //             <TouchableOpacity
  //               onPress={() =>
  //                 navigation.navigate('GetEmployee', {data: item})
  //               }>
  //               <Ionicons name="eye" size={22} color="black" />
  //             </TouchableOpacity>
  //           )}
  //         {item.name != 'admin' &&
  //           (user?.role === 'Admin' ||
  //             user?.permissions.includes('employees_edit')) && (
  //             <TouchableOpacity
  //               onPress={() =>
  //                 navigation.navigate('EditEmployee', {data: item})
  //               }>
  //               <MaterialIcons name="edit" size={22} color="black" />
  //             </TouchableOpacity>
  //           )}
  //         {item.name != 'admin' &&
  //           (user?.role === 'Admin' ||
  //             user?.permissions.includes('employees_delete')) && (
  //             <TouchableOpacity>
  //               <MaterialIcons
  //                 name="delete-outline"
  //                 size={22}
  //                 color="red"
  //                 onPress={() => {
  //                   setConfirmDelete(true);
  //                   setDeleteItem(item);
  //                 }}
  //               />
  //             </TouchableOpacity>
  //           )}
  //         {item.id == deleteItem?.id && (
  //           <Modal
  //             animationType="slide"
  //             transparent={true}
  //             visible={confirmDelete}>
  //             <View style={styles.loginModalView}>
  //               <View>
  //                 <Text style={styles.deleteModalmsg}>
  //                   Are you sure you want to delete{' '}
  //                   <Text style={{color: '#FF6347'}}> {deleteItem?.name}</Text>?
  //                 </Text>
  //               </View>
  //               <View style={{flexDirection: 'row'}}>
  //                 <Text
  //                   style={styles.deleteModaltext}
  //                   onPress={() => {
  //                     setConfirmDelete(false);
  //                   }}>
  //                   No
  //                 </Text>
  //                 <Text
  //                   style={styles.deleteModaltext}
  //                   onPress={() => {
  //                     deleteEmployee(deleteItem?.id);
  //                     setConfirmDelete(false);
  //                   }}>
  //                   Yes
  //                 </Text>
  //               </View>
  //             </View>
  //           </Modal>
  //         )}
  //       </View>
  //     </View>
  //   );
  // };

  return (
    <View style={styles.container}>
      <View style={styles.stylebox}>
        <CheckBox value={active} onValueChange={() => setActive(!active)} />
        <Text style={styles.txt}>active</Text>
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
            Status
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
        {filteredmember && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{height: windowHeight * 0.45}}>
            {filteredmember.map(itm => {
              return (
                <View style={styles.mealList} key={itm?._id}>
                  <Text style={styles.mealdate}>{itm?.fullname}</Text>
                  <Text style={styles.mealfield}>{itm?.status}</Text>
                  <Text style={styles.mealfield}>{itm?.balance}</Text>
                </View>
              );
            })}
          </ScrollView>
        )}
      </View>
      <Modal animationType="slide" transparent={true} visible={false}>
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
export default AddMember;
