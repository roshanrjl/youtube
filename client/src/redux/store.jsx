import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; 
import formReducer from "./formSlice";
import themeReducer from "./themeSlice";

const store = configureStore({
    reducer:{
        auth:authReducer,
        form: formReducer,
        theme: themeReducer,

    }
})  
export default store;