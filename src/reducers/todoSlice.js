import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  tasks:[]
}

export const todoSlice = createSlice({
  name:"todo",
  initialState,
  reducers:{
    addTask:(state, action)=>{
      state.tasks.push(action.payload)
    },
    removeTask:(state, action)=>{
      state.tasks.splice(action.payload, 1)
    },
    taskComplete:(state,action)=>{
      const index = action.payload;
      state.tasks[index].isDone = !state.tasks[index].isDone
    },
    clearAll:(state)=>{
      state.tasks = [];
    }
  }
})

export const {addTask, removeTask, taskComplete, clearAll} = todoSlice.actions;
export default todoSlice.reducer;