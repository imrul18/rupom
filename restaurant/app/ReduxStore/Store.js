import {configureStore} from '@reduxjs/toolkit';

import UsersReducer from './UsersStore';
import AuthReducer from './AuthStore';

export default configureStore({
  reducer: {
    usersStore: UsersReducer,
    authStore: AuthReducer,
  },
});
