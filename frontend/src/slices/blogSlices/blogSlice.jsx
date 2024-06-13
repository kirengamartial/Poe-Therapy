import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    userBlog: localStorage.getItem('userBlog') ? JSON.parse(localStorage.getItem('userBlog')) : []
}

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        setBlog: (state, action) => {
         state.userBlog= action.payload
         localStorage.setItem('userBlog', JSON.stringify(action.payload))
        },
        createBlog: (state, action) => {
         state.userBlog = [...state.userBlog, action.payload]
        },
        editBlog: (state, action) => {
            state.userBlog = state.userBlog.map(time => time._id === action.payload._id ? action.payload : time)
        },
        deleteBlog: (state, action) => {
            state.userBlog = state.userBlog.filter(time => time._id !== action.payload)
        }
    }
})

export const {setBlog, createBlog, editBlog, deleteBlog} = blogSlice.actions
export default blogSlice.reducer