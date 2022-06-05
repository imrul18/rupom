import http from './http-common';

const getuserdata = async username => {
  const res = await http.get(`users/getuserdata/${username}`);
  return res.data;
};

const getmealdata = async username => {
  const res = await http.get(`users/getmealdata/${username}`);
  return res.data;
};

const getpaymentdata = async username => {
  const res = await http.get(`users/getpaymentdata/${username}`);
  return res.data;
};

const getbalancedata = async username => {
    const res = await http.get(`users/getbalancedata/${username}`);
    return res.data;
  };

const UserService = {
  getuserdata,
  getmealdata,
  getpaymentdata,
  getbalancedata
};

export default UserService;
