import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; 
import formReducer from "./formSlice";

const store = configureStore({
    reducer:{
        auth:authReducer,
        form: formReducer,

    }
})  
export default store;