import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    galleryInfo: localStorage.getItem('gallery') ? JSON.parse(localStorage.getItem('gallery')) : []
}

const gallerySlice = createSlice({
    name: 'gallery', 
    initialState,
    reducers: {
        setGallery: (state, action) => {
            state.galleryInfo = action.payload
            localStorage.setItem('galleryInfo', JSON.stringify(action.payload))
        },
        createGallery: (state, action) => {
            state.galleryInfo = [...state.galleryInfo, action.payload]
        },
        editGallery: (state, action) => {
            state.galleryInfo = state.galleryInfo.map(gallery => gallery._id === action.galleryInfo._id ? action.payload : time)
        },
        deleteGallery: (state, action) => {
            state.galleryInfo = state.galleryInfo.filter(gallery => gallery._id !== action.payload)
        }
    }
})

export const {setGallery,createGallery, editGallery, deleteGallery} = gallerySlice.actions
export default gallerySlice.reducer