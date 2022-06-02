import http from './http-common';
import Toast from 'react-native-toast-message';

const addbyqrcode = async data => {
  try {
    const res = await http.post(`meals/addbyqrcode`, data);
    return res.data;
  } catch {
    Toast.show({
      type: 'error',
      text1: 'Invalid QR code',
      text2: 'Please Scan a valid QR code...',
      position: 'top',
    });
  }
};

const addbyqrusername = async (data) => {
    try {
        const res = await http.post(`meals/addbyqrusername`, data);
        return res.data;
      } catch {
        Toast.show({
          type: 'error',
          text1: 'Invalid QR code',
          text2: 'Please Scan a valid QR code...',
          position: 'top',
        });
      }
};

const MealService = {
  addbyqrcode,
  addbyqrusername,
};

export default MealService;
