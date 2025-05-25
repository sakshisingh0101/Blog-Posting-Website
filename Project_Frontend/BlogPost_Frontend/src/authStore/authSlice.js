import { createSlice,nanoid } from "@reduxjs/toolkit";
const initialState={
    userData:null,
    login_status:false
}
const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
       login_status_toggle:(state,action)=>{
            state.login_status=action.payload;
       },
       addUserData:(state,action)=>{
        state.userData=action.payload;

       }

    }
})
export const {login_status_toggle,addUserData}=authSlice.actions
export const authReducer=authSlice.reducer