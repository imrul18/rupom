import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  Linking,
  Text,
} from 'react-native';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import logo from '../../../assets/media/logos/naf.png';

import {createDrawerNavigator} from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();

// import {loadUserFromLocal} from '../../../ReduxStore/AuthStore';
import {useDispatch, useSelector} from 'react-redux';

// import Dashboard from './dashboard/deshboard';
// import UserManagement from './user_management/UserManagement';
// import Customers from './customers/Customers';
// import Sales from './sales/Sales';
// import Profile from './profile/Profile';
// import Inventory from './inventory/Inventory';
// import Reports from './reports/Reports';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Test from './test';
import {setToken} from '../../ReduxStore/AuthStore';

import AllMembers from './all_member/AllMembers';
import AddMeal from './add_meal/AddMeal';
import Payments from './payments/Payments';
import AddMember from './add_member/AddMember';

const Authenticated = ({navigation}) => {
  const dispatch = useDispatch();

  return (
    <Drawer.Navigator
      //   drawerContent={props => {
      //     return (
      //       <>
      //         <Image source={logo} style={styles.logo} />
      //         <DrawerContentScrollView {...props}>
      //           <DrawerItemList {...props} />
      //           <View style={styles.customItem}>
      //             <Text
      //               style={styles.customItemText}
      //               onPress={() => {
      //                 Linking.openURL('https://www.nafgroup.org/');
      //               }}>
      //               About Us
      //             </Text>
      //           </View>
      //         </DrawerContentScrollView>
      //       </>
      //     );
      //   }}
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity
            style={styles.icon}
            onPress={async () => {
              navigation.navigate('qrshow');
              await AsyncStorage.removeItem('user');
              dispatch(setToken(null));
            }}>
            <MaterialCommunityIcons name="logout" size={24} color="red" />
          </TouchableOpacity>
        ),
      }}>
      <Drawer.Screen
        name="Dashboard"
        component={Test}
        options={{
          drawerIcon: ({focused, size}) => {
            let color = focused ? 'red' : 'black';
            return <MaterialIcons name="dashboard" size={size} color={color} />;
          },
        }}
      />
      <Drawer.Screen
        name="All Members"
        component={AllMembers}
        options={{
          drawerIcon: ({focused, size}) => {
            let color = focused ? 'red' : 'black';
            return <MaterialIcons name="people" size={size} color={color} />;
          },
        }}
      />
      <Drawer.Screen
        name="Add Members"
        component={AddMember}
        options={{
          drawerIcon: ({focused, size}) => {
            let color = focused ? 'red' : 'black';
            return (
              <MaterialIcons name="person-add" size={size} color={color} />
            );
          },
        }}
      />
      <Drawer.Screen
        name="Add Meal"
        component={AddMeal}
        options={{
          drawerIcon: ({focused, size}) => {
            let color = focused ? 'red' : 'black';
            return <MaterialIcons name="set-meal" size={size} color={color} />;
          },
        }}
      />
      <Drawer.Screen
        name="Payments"
        component={Payments}
        options={{
          drawerIcon: ({focused, size}) => {
            let color = focused ? 'red' : 'black';
            return (
              <FontAwesome5 name="money-check-alt" size={size} color={color} />
            );
          },
        }}
      />

      <Drawer.Screen
        name="Profile"
        component={Test}
        options={{
          drawerIcon: ({focused, size}) => {
            let color = focused ? 'red' : 'black';
            return <FontAwesome5 name="user-tie" size={size} color={color} />;
          },
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    paddingHorizontal: 20,
  },
  logo: {
    height: 50,
    width: 240,
    margin: 20,
    resizeMode: 'stretch',
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  customItemText: {
    fontSize: 16,
    fontWeight: '700',
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
    backgroundColor: '#2094C5',
    borderColor: '#2094C5',
    color: '#fff',
  },
});

export default Authenticated;
