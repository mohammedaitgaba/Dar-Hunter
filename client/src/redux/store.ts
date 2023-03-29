import {configureStore} from '@reduxjs/toolkit'
import authReducer from './features/auth/AuthSlice'
import postDataReducer from "./features/PostSlice";

export const store = configureStore({
    reducer:{
        auth:authReducer,
        postData: postDataReducer,
    }
})