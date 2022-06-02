import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import MemberList from './MemberList';
import MemberProfile from './MemberProfile';
import MemberMealDetails from './MemberMealDetails';
import MemberPaymentDetails from './MemberPaymentDetails';
import MemberBalanceHistory from './MemberBalanceHistory';

const Stack = createStackNavigator();

const AllMembers = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="memberlist" component={MemberList} />
      <Stack.Screen name="member_profile" component={MemberProfile} />
      <Stack.Screen name="member_meal_details" component={MemberMealDetails} />
      <Stack.Screen name="member_payment_details" component={MemberPaymentDetails} />
      <Stack.Screen name="member_balance_history" component={MemberBalanceHistory} />
    </Stack.Navigator>
  );
};

export default AllMembers;
