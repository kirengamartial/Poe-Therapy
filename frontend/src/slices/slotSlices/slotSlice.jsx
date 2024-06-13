import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    userSlot: localStorage.getItem('userSlot') ? JSON.parse(localStorage.getItem('userSlot')) : []
}

const slotSlice = createSlice({
    name: 'slot',
    initialState,
    reducers: {
        setSlot: (state, action) => {
         state.userSlot= action.payload
         localStorage.setItem('userSlot', JSON.stringify(action.payload))
        },
        createSlot: (state, action) => {
         state.userSlot = [...state.userSlot, action.payload]
        },
        deleteSlot: (state, action) => {
            state.userSlot = state.userSlot.filter(time => time._id !== action.payload)
        }
    }
})

export const {setSlot, createSlot, deleteSlot } = slotSlice.actions
export default slotSlice.reducer