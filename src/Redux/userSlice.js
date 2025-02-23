import { createSlice } from "@reduxjs/toolkit";

const storedUser = JSON.parse(sessionStorage.getItem("user")) || null;


const userSlice=createSlice({
    name:"user",
    initialState:storedUser,
    reducers:{
        addUser: (state, action) => {
            sessionStorage.setItem("user", JSON.stringify(action.payload));
            return action.payload;
          },
    }
})

export const {addUser,removeUser}=userSlice.actions
export default userSlice.reducer;