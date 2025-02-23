import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./userSlice"; 
import ThemeReducer from "./TheamSlice"

const appStore=configureStore({
    reducer:{
        user:userReducer,
        theme: ThemeReducer,
    },

});

export default appStore;