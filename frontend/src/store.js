import  {configureStore} from '@reduxjs/toolkit'
import authSlice from './slices/userSlices/authSlice'
import gallerySlice from './slices/gallerySlices/gallerySlice'
import timeSlice from './slices/timeSlices/timeSlice'
import slotSlice from './slices/slotSlices/slotSlice'
import blogSlice from './slices/blogSlices/blogSlice'
import videoSlice from './slices/videoSlices/videoSlice'
import commentSlice from './slices/commentSlices/commentSlice'
import { apiSlice } from './slices/apiSlice'

const store = configureStore({
    reducer: {
        auth: authSlice,
        gallery: gallerySlice,
        time: timeSlice,
        slot: slotSlice,
        blog: blogSlice,
        video: videoSlice,
        comment: commentSlice,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

export default store