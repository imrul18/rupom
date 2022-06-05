import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from 'react-native-toast-message';

import axios from "axios";

let Api = axios.create({
  baseURL: `http://192.168.0.42:3000/`,
  // baseURL: `http://localhost:3000/`,
  headers: {
    "Content-type": "application/json",
    "accept": "application/json",
  },
  transformResponse: function (data) {

    let response = JSON.parse(data);

    if (response.type==='error') {
      Toast.show({ type: 'error', text1: response?.message, text2: response?.message2, position: "top" });
    }

    if (response.type==='info') {
      Toast.show({ type: 'info', text1: response?.message, text2: response?.message2, position: "top" });
    }
      
      const Unauthenticated = async () => {
        await AsyncStorage.removeItem('user')
      }
      if (response?.message === "Unauthenticated.") {
        Unauthenticated();
      }
    return response;
  },

  validateStatus: function (status) {
    // if (status === 401) {
    //   localStorage.removeItem('user')
    // }
    return status >= 200 && status < 300; // default
  },
});

Api.interceptors.request.use(async (config) => {
  config.headers.Authorization = `Bearer ${JSON.parse(await AsyncStorage.getItem('user'))?.access_token}`
  return config;
});

export default Api