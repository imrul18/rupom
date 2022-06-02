import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';

import WelcomePage from './auth/WelcomePage';
import QRShow from './auth/QRShow';
import Login from './auth/Login';
import Dashboard from './user/Dashboard';
import MealDetails from './user/MealDetails';
import PaymentDetails from './user/PaymentDetails';
import Authenticated from './authenticated/Authenticated';

const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="welcome" component={WelcomePage} />
        <Stack.Screen name="qrshow" component={QRShow} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="dashboard" component={Dashboard} />
        <Stack.Screen name="mealdetails" component={MealDetails} />
        <Stack.Screen name="paymentdetails" component={PaymentDetails} />
        <Stack.Screen name="authenticated" component={Authenticated} />
      </Stack.Navigator>

      <Toast />
    </NavigationContainer>
  );
};

export default Main;
