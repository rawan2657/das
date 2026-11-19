import { configureStore } from "@reduxjs/toolkit";
import  environment from "../../config/environment"
import { apiSlice } from "../app/api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
 export const store= configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer
    },
    middleware:(getDefaultMiddleware)=> getDefaultMiddleware().concat(apiSlice.middleware ),
    devTools:environment.isDevelopment
})
setupListeners(store.dispatch )