import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import AddPayments from './AddPayments';
import MakePayments from './MakePayments';

const Stack = createStackNavigator();

const Payments = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="add_payment" component={AddPayments} />
      <Stack.Screen name="make_payment" component={MakePayments} />
    </Stack.Navigator>
  );
};

export default Payments;
