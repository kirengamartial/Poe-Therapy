import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    userComment: localStorage.getItem('userComment') ? JSON.parse(localStorage.getItem('userComment')) : []
}

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        setComment: (state, action) => {
         state.userComment= action.payload
         localStorage.setItem('userComment', JSON.stringify(action.payload))
        },
        createComment: (state, action) => {
         state.userComment = [...state.userComment, action.payload]
        }
    }
})

export const {setComment, createComment} = commentSlice.actions
export default commentSlice.reducer