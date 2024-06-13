import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    userVideo: localStorage.getItem('userVideo') ? JSON.parse(localStorage.getItem('userVideo')) : []
}

const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {
        setVideo: (state, action) => {
         state.userVideo= action.payload
         localStorage.setItem('userVideo', JSON.stringify(action.payload))
        },
        createVideo: (state, action) => {
         state.userVideo = [...state.userVideo, action.payload]
        },
        editVideo: (state, action) => {
            state.userVideo = state.userVideo.map(time => time._id === action.payload._id ? action.payload : time)
        },
        deleteVideo: (state, action) => {
            state.userVideo = state.userVideo.filter(time => time._id !== action.payload)
        }
    }
})

export const {setVideo, createVideo, editVideo, deleteVideo} = videoSlice.actions
export default videoSlice.reducer