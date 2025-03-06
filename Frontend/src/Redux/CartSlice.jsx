import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tests: [], // Array to store all test objects
  enrollmentnum: [], // Array to store all test objects
  En_Dis:[],
  Result:[],
  admins:[],
};


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addtestss: (state, action) => {
      state.tests.push(action.payload); // Push the test data to the array
      
    },
    addtempenrollmentnumber: (state, action) => {
      state.enrollmentnum.push(action.payload); // Push the test data to the array
     
      
    },
    addmin: (state, action) => {
      state.admins.push(action.payload); // Push the test data to the array
      console.log(action.payload);
      
      
    },
    enable_disabled: (state, action) => {
      state.En_Dis.push(action.payload); // Push the test data to the array
      
    },
    resultss: (state, action) => {
      state.Result.push(action.payload); // Push the test data to the array
      
    },
  },
});

export const { addtestss,enable_disabled ,resultss,addmin,addtempenrollmentnumber} = cartSlice.actions;
export default cartSlice.reducer;
