import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice'
import adminReducer from "./features/adminSlice";
import theaterReducer from "./features/theaterSlice";
export const store = configureStore({
  reducer: {
    admin: adminReducer,
    user:userReducer,
    theater: theaterReducer,
  },
})

