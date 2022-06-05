import http from './/http-common';

const getAll = async () => {
  const res = await http.get('members/getall');
  return res.data;
};

const add = async data => {
  const res = await http.post('members/add', data);
  return res.data;
};
const memberService = {
  getAll,
  add
};

export default memberService;
