import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    input:"",
    data:[],
    
}

const todoSlice = createSlice({
    name : 'todolist',
    initialState,
    reducers:{
        handleChange: (state,action) => {
            state.input = action.payload;
          },
        
        addTodo:(state,action)=>{
            return {
                data:[...state.data,state.input]
            }       
        },
        clearAll:(state)=>{
            state.data = [];
        },
        deleteTodo:(state,action)=>{
            let remItems = state.data.filter((elem, index) => index != action.payload);
            state.data = remItems;
        },
        updateTodo:(state,action)=>{
           console.log(action.payload);
           state.data.splice(action.payload.indexNumber, 1, state.input);
        },
    },    
})

export const {handleChange,addTodo,clearAll,deleteTodo,updateTodo} = todoSlice.actions;
export default todoSlice.reducer;