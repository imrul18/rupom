import http from './http-common';

const addbreakfast = async data => {
  const res = await http.post(`meals/addbreakfast`, data);
  return res.data;
};
const addlunch = async data => {
  const res = await http.post(`meals/addlunch`, data);
  return res.data;
};
const adddinner = async data => {
  const res = await http.post(`meals/adddinner`, data);
  return res.data;
};

const MealService = {
  addbreakfast,
  addlunch,
  adddinner,
};

export default MealService;
