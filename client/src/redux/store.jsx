import { configureStore } from "@reduxjs/toolkit";
import  authslice from "./authSlice"
import formReducer from "./formSlice";

const store = configureStore({
    reducer:{
        auth:authslice,
        form: formReducer,

    }
})  
export default store;