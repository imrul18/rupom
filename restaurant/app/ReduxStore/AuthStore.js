import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',

  initialState: {
    access_token: null,
  },

  reducers: {
    setToken: (state, action) => {
      state.access_token = action.payload;
    },
  },
});

export const {setToken} = authSlice.actions;

export default authSlice.reducer;
