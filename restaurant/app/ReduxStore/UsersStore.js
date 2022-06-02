import {createSlice} from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'auth',

  initialState: {
    userData: null,
    userMeal: null,
    userPayment: null,
  },

  reducers: {
    setUsers: (state, action) => {
      state.userData = action.payload.userData;
      state.userMeal = action.payload.meals;
      state.userPayment = action.payload.payments;
    },
  },
});

export const {setUsers} = usersSlice.actions;

export default usersSlice.reducer;
