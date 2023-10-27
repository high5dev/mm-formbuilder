import { createSlice } from "@reduxjs/toolkit";

export const appNotifications = createSlice({
    name:"appNotifications",
    initialState:{
        bookings:[],
        myBuilder:[]
    },
    reducers:{
        bookingsReducer:(state,action) =>{
            state.bookings = action?.payload
        },
        myBuilderReducer:(state,action) =>{
            state.myBuilder = action?.payload
        },
    }
})
export const {bookingsReducer,myBuilderReducer} = appNotifications.actions;
export default appNotifications.reducer;
