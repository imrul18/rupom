import http from './/http-common';

const getAll = async data => {
  const res = await http.get('members/getall');

  return res.data.data;
};
const memberService = {
  getAll,
};

export default memberService;
