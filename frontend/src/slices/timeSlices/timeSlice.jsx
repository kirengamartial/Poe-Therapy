import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    userTime: localStorage.getItem('userTime') ? JSON.parse(localStorage.getItem('userTime')) : []
}

const timeSlice = createSlice({
    name: 'time',
    initialState,
    reducers: {
        setTime: (state, action) => {
         state.userTime= action.payload
         localStorage.setItem('userTime', JSON.stringify(action.payload))
        },
        createTime: (state, action) => {
         state.userTime = [...state.userTime, action.payload]
        },
        editTime: (state, action) => {
            state.userTime = state.userTime.map(time => time._id === action.payload._id ? action.payload : time)
        },
        deleteTime: (state, action) => {
            state.userTime = state.userTime.filter(time => time._id !== action.payload)
        }
    }
})

export const {setTime, createTime, editTime, deleteTime} = timeSlice.actions
export default timeSlice.reducer