import http from './http-common';
import Toast from 'react-native-toast-message';

const addpayment = async data => {
  try {
    const res = await http.post(`payments/add`, data);
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



const PaymentService = {
  addpayment,
};

export default PaymentService;
